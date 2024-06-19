// Libs
const { knex } = require("@database/databaseConnection")();

// Constant
const { dateFormatShortYear } = require("@helpers/standards");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number}  contract - The contract number to retrieve data for.
 * @returns {Promise}          - A promise that resolves to the query result
 */
const queries = {
  contractSummary: (contract) =>
    knex("contract")
      .select({
        contract: "contract.*",
        start_date: knex.raw(`TO_CHAR(contract.start_date :: DATE, '${dateFormatShortYear}')`),
        end_date: knex.raw(`TO_CHAR(contract.end_date :: DATE, '${dateFormatShortYear}')`),
        total_contract: knex.raw("contract.total_fee_amount + contract.total_expense_amount"),
        supplier_name: "supplier_name",
        internal_coding: "internal_coding.*",
        portfolio: "portfolio.*",
        portfolio_name: "portfolio.portfolio_name",
      })
      .leftJoin("data.supplier as supplier", { "supplier.id": "contract.supplier_id" })
      .leftJoin("data.sid_internal_coding as internal_coding", {
        "contract.id": "internal_coding.contract_id",
      })
      .leftJoin("data.portfolio as portfolio", { "portfolio.id": "internal_coding.portfolio_id" })
      .where("contract.id", contract)
      .first(),

  contractInvoices: (contract) =>
    knex("invoice")
      .select({
        fiscal: knex.min("fiscal_year"),
        billing_period: knex.min("billing_period"),
        invoice_date: knex.raw(`MIN(TO_CHAR(invoice_date, '${dateFormatShortYear}'))`),
        invoice_number: "invoice_number",
        invoice_amount: knex.raw("SUM(unit_amount * rate)"),
      })
      .leftJoin("data.contract as contract", { "contract.id": "invoice.contract_id" })
      .leftJoin("data.fiscal_year as fiscal_year", { "fiscal_year.id": "invoice.fiscal" })
      .leftJoin("data.invoice_detail as invoice_detail", {
        "invoice.id": "invoice_detail.invoice_id",
      })
      .where("invoice.contract_id", contract)
      .groupBy("invoice_number")
      .orderBy("invoice_number"),

  // see: https://localhost:3000/contracts/1620
  contractPayments: (contract) =>
    knex("invoice_detail as detail")
      .select({
        fiscal: "fiscal_year",
        fees_invoiced: knex.raw("sum(unit_amount * rate)"),
        fees_remaining: knex.raw("min(total_fee_amount) - sum(unit_amount * rate)"),
      })
      .leftJoin("invoice", { "detail.invoice_id": "invoice.id" })
      .leftJoin("contract", { "contract.id": "invoice.contract_id" })
      .leftJoin("fiscal_year as fiscal", { "fiscal.id": "invoice.fiscal" })
      .where({ "invoice.contract_id": contract })
      .groupBy("fiscal.id")
      .debug(),

  contractAmendments: (contract) =>
    knex("contract_amendment")
      .select({
        amendment_number: "amendment_number",
        amendment_date: knex.raw(
          `TO_CHAR(contract_amendment.amendment_date, '${dateFormatShortYear}')`
        ),
        amendment_type: knex.raw(`string_agg(amendment_type.amendment_type_name, ', ')`),
        description: "contract_amendment.description",
      })
      .leftJoin("contract_amendment_amendment_type as cat", {
        "contract_amendment.id": "cat.contract_amendment_id",
      })
      .leftJoin("amendment_type", { "amendment_type.id": "cat.amendment_type_id" })
      .where("contract_amendment.contract_id", contract)
      .groupBy("contract_amendment.id")
      .orderBy("contract_amendment.amendment_date"),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {number} contract - The contract number to retrieve data for.
 * @returns {object}          - An object containing fiscal year, report, and report total.
 */
// add other parameters if needed, like quarter, portfolio, date etc.
const getAll = async ({ contract }) => {
  try {
    // Await all promises in parallel
    const [contractSummary, invoice_processing, payment_summary, contract_amendment] =
      await Promise.all([
        queries.contractSummary(contract),
        queries.contractInvoices(contract),
        queries.contractPayments(contract),
        queries.contractAmendments(contract),
      ]);

    // Shape this data into a form that matches the report template.
    return {
      contract: contractSummary,
      invoice_processing,
      payment_summary,
      contract_amendment,
    };
  } catch (error) {
    throw new Error(`Error retrieving data for the Contract Summary report. ${error.message}`);
  }
};

module.exports = { required: ["contract"], getAll };
