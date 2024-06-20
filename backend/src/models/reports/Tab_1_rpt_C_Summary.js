// Libs
const { knex } = require("@database/databaseConnection")();

// Constant
const { dateFormatShortYear } = require("@helpers/standards");

/**
 * Retrieves contract information with associated supplier, internal coding, portfolio, and recovery type data.
 *
 * @param   {number}  contract - The ID of the contract to retrieve.
 * @returns {Promise}          - A promise that resolves to the contract information.
 */
const queries = {
  contractSummary: (contract) =>
    knex("contract")
      .select({
        // Contract information
        co_number: "contract.co_number",
        supplier_name: "supplier.supplier_name",
        start_date: knex.raw(`TO_CHAR(contract.start_date :: DATE, '${dateFormatShortYear}')`),
        end_date: knex.raw(`TO_CHAR(contract.end_date :: DATE, '${dateFormatShortYear}')`),
        total_contract: knex.raw(`contract.total_fee_amount + contract.total_expense_amount`), // Calculate total contract value
        description: "contract.description",
        fee_amount: "contract.total_fee_amount",
        expense_amount: "contract.total_expense_amount",

        // Internal coding information
        portfolio_name: "portfolio.portfolio_name",
        asset_tag: "icc.asset_tag",
        service_line: "portfolio.service_line",
        wip_no: "icc.wip_no",
        port_responsibility: "portfolio.responsibility",
        qualified_receiver: "icc.qualified_receiver",
        stob: "icc.stob",

        // Recovery type information
        recovery_info: knex.raw(`COALESCE(rec.recovery_type_name, '')`),
        cas_project_number: "icc.cas_project_number",
      })
      // Join all tables together so all columns are linked to this contract number
      .leftJoin("data.supplier as supplier", { "supplier.id": "contract.supplier_id" })
      .leftJoin("data.sid_internal_coding as icc", { "icc.contract_id": "contract.id" })
      .leftJoin("data.portfolio as portfolio", { "portfolio.id": "icc.portfolio_id" })
      .leftJoin("data.sid_internal_coding_recovery_type as icr", {
        "icr.sid_internal_coding_id": "icc.id",
      })
      .leftJoin("data.recovery_type as rec", { "rec.id": "icr.recovery_type_id" })
      .where("contract.id", contract)
      .first(),

  contractInvoices: (contract) => {
    // Defines columns to select from the joined invoice data tables
    const invoiceColumns = {
      fiscal: "fiscal_year.fiscal_year",
      billing_period: knex.min("billing_period"),
      invoice_date: knex.raw(`MIN(TO_CHAR(invoice_date, '${dateFormatShortYear}'))`),
      invoice_number: "invoice.invoice_number",
      invoice_amount: knex.raw("SUM(unit_amount * rate)"),
    };

    // Common Joins for contract invoice data.
    const contractJoin = {
      table: "data.contract as contract",
      on: { "contract.id": "invoice.contract_id" },
    };

    const fiscalYearJoin = {
      table: "data.fiscal_year as fiscal_year",
      on: { "fiscal_year.id": "invoice.fiscal" },
    };

    const invoiceDetailJoin = {
      table: "data.invoice_detail as invoice_detail",
      on: { "invoice.id": "invoice_detail.invoice_id" },
    };

    // Extract the columns from the joined tables.
    return knex("invoice")
      .select(invoiceColumns)
      .leftJoin(contractJoin.table, contractJoin.on)
      .leftJoin(fiscalYearJoin.table, fiscalYearJoin.on)
      .leftJoin(invoiceDetailJoin.table, invoiceDetailJoin.on)
      .where("contract.id", contract)
      .groupBy("invoice_number", "fiscal_year.fiscal_year")
      .orderBy("invoice_number");
  },

  contractPayments: (contract) => {
    const caseStatement = (condition, trueValue, falseValue, alias) =>
      knex.raw(`CASE WHEN ${condition} THEN ${trueValue} ELSE ${falseValue} END AS ${alias}`);

    const selectFields = [
      "contract_id",
      "fees_invoiced",
      "expenses_invoiced",
      "total_invoiced",
      "contract_status",
      caseStatement(
        "contract_status IN ('Complete', 'Cancelled')",
        "0::money",
        "total_fee_amount - fees_invoiced::money",
        "fees_remaining"
      ),
      caseStatement(
        "contract_status NOT IN ('Complete', 'Cancelled')",
        "0::money",
        "total_fee_amount - fees_invoiced::money",
        "descoped_fees_remaining"
      ),
      caseStatement(
        "contract_status IN ('Complete', 'Cancelled')",
        "0::money",
        "total_expense_amount - expenses_invoiced::money",
        "expenses_remaining"
      ),
      caseStatement(
        "contract_status NOT IN ('Complete', 'Cancelled')",
        "0::money",
        "total_expense_amount - expenses_invoiced::money",
        "descoped_expenses_remaining"
      ),
      caseStatement(
        "contract_status IN ('Complete', 'Cancelled')",
        "0::money",
        "total_fee_amount + total_expense_amount - total_invoiced::money",
        "total_remaining"
      ),
      caseStatement(
        "contract_status IN ('Complete', 'Cancelled')",
        "total_fee_amount + total_expense_amount - total_invoiced::money",
        "0::money",
        "descoped_total_remaining"
      ),
      caseStatement(
        "total_fee_amount + total_expense_amount >= 50000::money",
        "'Yes'",
        "'No'",
        "contract_ev_report_required"
      ),
    ];

    const subquery = knex.raw(`
    (
      SELECT
        SUM(CASE WHEN cd.is_expense THEN 0::money ELSE id.unit_amount * id.rate END) AS fees_invoiced,
        SUM(CASE WHEN cd.is_expense THEN id.unit_amount * id.rate ELSE 0::money END) AS expenses_invoiced,
        SUM(id.unit_amount * id.rate) AS total_invoiced,
        c.status AS contract_status,
        c.id AS contract_id,
        c.co_number,
        c.total_fee_amount,
        c.total_expense_amount
      FROM data.contract c
      LEFT JOIN data.invoice i ON c.id = i.contract_id
      LEFT JOIN data.invoice_detail id ON i.id = id.invoice_id
      LEFT JOIN data.contract_deliverable cd ON id.contract_deliverable_id = cd.id
      GROUP BY c.id, c.co_number, c.total_fee_amount, c.total_expense_amount, c.status
    ) a
  `);

    return knex.select(selectFields).from(subquery).where("contract_id", contract);
  },

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
