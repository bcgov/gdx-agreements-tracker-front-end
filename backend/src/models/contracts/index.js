const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const contractsTable = `${dataBaseSchemas().data}.contract`;
const fiscalTable = `${dataBaseSchemas().data}.fiscal_year`;
const suppliersTable = `${dataBaseSchemas().data}.supplier`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;
const projectTable = `${dataBaseSchemas().data}.project`;
const procurementMethodTable = `${dataBaseSchemas().data}.procurement_method`;
const contractSubcontractorTable = `${dataBaseSchemas().data}.contract_subcontractor`;
const contractResourceTable = `${dataBaseSchemas().data}.contract_resource`;
const contractDeliverableTable = `${dataBaseSchemas().data}.contract_deliverable`;
const invoiceDetail = `${dataBaseSchemas().data}.invoice_detail`;
const subcontractor = `${dataBaseSchemas().data}.subcontractor`;

// Get all.
const findAll = () => {
  return knex(`${contractsTable} as c`)
    .columns(
      "c.contract_number",
      "c.co_version",
      "c.description",
      { supplier: "supplier.supplier_name" },
      { start_date: knex.raw(`c.start_date`) },
      { end_date: knex.raw(`c.end_date`) },
      { max_amount: knex.raw(`total_fee_amount + c.total_expense_amount`) },
      {
        remaining_amount: knex.raw(`(
        SELECT SUM(invd.unit_amount * invd.rate) FROM ${contractsTable} AS cont
        JOIN invoice AS inv ON cont.id = inv.contract_id
        JOIN invoice_detail AS invd ON inv.id = invd.invoice_id
        WHERE cont.id = c.id
      )`),
      },
      "c.status",
      { fiscal: "fy.fiscal_year" },
      "p.project_number",
      { portfolio: "portfolio.portfolio_name" },
      "c.id"
    )
    .leftJoin(`${fiscalTable} as fy`, { "c.fiscal": `fy.id` })
    .leftJoin(suppliersTable, { "c.supplier_id": `${suppliersTable}.id` })
    .leftJoin(portfolioTable, { "c.supplier_id": `${portfolioTable}.id` })
    .leftJoin(`${projectTable} as p`, { "c.project_id": `p.id` })
    .orderBy("c.id", "desc");
};

// Get One
const findById = (contractId) => {
  return knex
    .select(
      "c.id",
      "c.co_number",
      "c.contract_number",
      "c.requisition_number",
      "c.start_date",
      "c.end_date",
      "c.description",
      "c.notes",
      knex.raw(
        `jsonb_agg(
          CASE
              WHEN sc.id IS NULL THEN '[]'::jsonb
              ELSE jsonb_build_object('value', sc.id, 'label', sc.subcontractor_name)
          END
      ) AS subcontractor_id`
      ),
      knex.raw(`total_fee_amount + c.total_expense_amount as max_amount`),
      "c.total_fee_amount",
      "c.total_expense_amount",
      knex.raw("( SELECT json_build_object('value', c.status, 'label', c.status)) AS status"),
      knex.raw("( SELECT json_build_object('value', c.fiscal, 'label', fy.fiscal_year)) AS fiscal"),
      knex.raw(
        "(SELECT json_build_object('project_number', COALESCE(proj.project_number, ''), 'project_name', COALESCE(proj.project_name, ''), 'project_status', COALESCE(proj.project_status, ''), 'value', proj.id) AS project_id)"
      ),
      knex.raw(
        "( SELECT json_build_object('value', c.contract_type, 'label', c.contract_type)) AS contract_type"
      ),
      knex.raw(
        "( SELECT json_build_object('value', c.supplier_id, 'label', s.supplier_name)) AS supplier_id"
      ),
      knex.raw(
        "( SELECT json_build_object('value', c.procurement_method_id, 'label', COALESCE(pm.procurement_method,''))) AS procurement_method_id"
      ),
      "proj.project_name",
      "proj.total_project_budget"
    )
    .from(`${contractsTable} as c`)
    .leftJoin(`${fiscalTable} as fy`, { "c.fiscal": "fy.id" })
    .leftJoin(`${suppliersTable} as s`, { "c.supplier_id": "s.id" })
    .leftJoin(`${portfolioTable} as port`, { "c.supplier_id": "port.id" })
    .leftJoin(`${projectTable} as proj`, { "c.project_id": "proj.id" })
    .leftJoin(`${procurementMethodTable} as pm`, { "c.procurement_method_id": "pm.id" })
    .leftJoin(`${contractSubcontractorTable} as csc`, { "c.id": "csc.contract_id" })
    .leftJoin(`${subcontractor} as sc`, { "csc.subcontractor_id": "sc.id" })
    .where("c.id", contractId)
    .groupBy(
      "c.co_number",
      "c.contract_number",
      "c.requisition_number",
      "c.start_date",
      "c.end_date",
      "c.description",
      "c.notes",
      "c.total_fee_amount",
      "c.total_expense_amount",
      "c.status",
      "c.fiscal",
      "proj.project_number",
      "proj.project_name",
      "proj.project_status",
      "c.contract_type",
      "c.supplier_id",
      "c.procurement_method_id",
      "proj.id",
      "port.*",
      "s.supplier_name",
      "pm.procurement_method",
      "port.id",
      "fy.fiscal_year",
      "c.id"
    )
    .first();
};

// Get all contracts by project id.
const findByProjectId = (projectId) => {
  return knex(contractsTable).select("id", "co_number").where("project_id", projectId);
};

// Update one.
const updateOne = (updatedContract, id) => {
  const { subcontractor_id, ...body } = updatedContract;

  // Array to store promises
  const promises = [];

  // Delete existing records
  promises.push(knex(contractSubcontractorTable).where("contract_id", id).del());

  // Insert new records if 'subcontractors' is present
  if (subcontractor_id) {
    for (const subcontractor of subcontractor_id) {
      promises.push(
        knex(contractSubcontractorTable).insert({
          contract_id: id,
          subcontractor_id: Number(subcontractor.value),
        })
      );
    }
  }

  // Update 'request' if it is present
  if (Object.keys(body).length > 0) {
    promises.push(knex(contractsTable).where("id", id).update(body));
  }

  // Return a promise that resolves when all promises in the array resolve
  return Promise.all(promises);
};

// Add one.
const addOne = async (newContract) => {
  const { subcontractor_id, ...body } = newContract;
  const promises = [];
  try {
    // Insert a record into the contracts table
    promises.push(
      knex(contractsTable)
        .insert({
          ...body,
        })
        .returning("id")
        .then((results) => {
          if (subcontractor_id) {
            for (const subcontractor of subcontractor_id) {
              promises.push(
                knex(contractSubcontractorTable)
                  .insert({
                    contract_id: results[0].id,
                    subcontractor_id: Number(subcontractor.value),
                  })
                  .then((results) => {
                    return results;
                  })
                  .catch((err) => {
                    return err;
                  })
              );
            }
          }
          return;
        })
    );

    // Insert new records if 'subcontractor_id' is present

    return Promise.all(promises);
  } catch (error) {
    // Handle error
    console.error("Error adding contract amendment:", error);
    throw error;
  }
};

// Get specific one by id.
const findBudgetsByFiscal = async (id) => {
  const currentYear = async () => {
    return knex(fiscalTable)
      .select("id", "is_current")
      .where("is_current", true)
      .first()
      .then((result) => {
        return result.id;
      });
  };

  const year = await currentYear();

  const totalFees = knex.raw("to_char(COALESCE(deliverables.total_fees, 0), '$999,999,999.00')");

  const totalExpenses = knex.raw(
    "to_char(ROUND(COALESCE(expenses.total_expenses, 0)), '$999,999,999.00')"
  );

  const invoicedFess = knex.raw(
    "to_char(COALESCE(invoiced_fees.invoiced_fees, 0), '$999,999,999.00')"
  );

  const invoicedExpenses = knex.raw(
    "to_char(COALESCE(invoiced_expenses.invoiced_expenses, 0), '$999,999,999.00')"
  );

  const remainingFees = knex.raw(
    `to_char(ROUND(COALESCE(deliverables.total_fees, 0) - COALESCE(invoiced_fees.invoiced_fees, 0)), '$999,999,999.00')`
  );

  const remaingExpenses = knex.raw(
    `to_char(ROUND(COALESCE(expenses.total_expenses, 0) - COALESCE(invoiced_expenses.invoiced_expenses, 0)), '$999,999,999.00')`
  );

  return knex(`${fiscalTable} as fy`)
    .columns({
      current_fiscal: "fy.is_current",
      fiscal: "fy.fiscal_year",
      total_fees: totalFees,
      total_expenses: totalExpenses,
      total: knex.raw(
        `to_char(COALESCE(deliverables.total_fees, 0) + ROUND(COALESCE(expenses.total_expenses, 0)), '$999,999,999.00')`
      ),
      total_hours: knex.raw("COALESCE(resources.total_hours, 0)"),
      invoiced_hours: knex.raw("ROUND(COALESCE(invoiced_resources.invoiced_hours, 0))"),
      invoiced_fees: invoicedFess,
      invoiced_expenses: invoicedExpenses,
      total_invoice: knex.raw(
        `to_char(COALESCE(invoiced_fees.invoiced_fees, 0) + COALESCE(invoiced_expenses.invoiced_expenses, 0), '$999,999,999.00')`
      ),

      remaining_hours: knex.raw(
        "ROUND(COALESCE(resources.total_hours, 0) - COALESCE(invoiced_resources.invoiced_hours, 0))"
      ),
      remaining_fees: remainingFees,
      remaining_expenses: remaingExpenses,
      total_remaining: knex.raw(
        `to_char(ROUND(COALESCE(deliverables.total_fees, 0) - COALESCE(invoiced_fees.invoiced_fees, 0)) + ROUND(COALESCE(expenses.total_expenses, 0) - COALESCE(invoiced_expenses.invoiced_expenses, 0)), '$999,999,999.00')`
      ),
    })
    .leftJoin(
      knex(contractResourceTable)
        .select("fiscal")
        .sum("hours as total_hours")
        .where("contract_id", id)
        .groupBy("fiscal")
        .as("resources"),
      "resources.fiscal",
      "fy.id"
    )
    .leftJoin(
      knex(contractDeliverableTable)
        .select("fiscal", knex.raw("SUM(deliverable_amount::NUMERIC::float8) as total_expenses"))
        .where("contract_id", id)
        .where("is_expense", false)
        .groupBy("fiscal")
        .as("expenses"),
      "expenses.fiscal",
      "fy.id"
    )
    .leftJoin(
      knex(contractDeliverableTable)
        .select("fiscal", knex.raw("SUM(deliverable_amount::NUMERIC::float8) as total_fees"))
        .where("contract_id", id)
        .where("is_expense", true)
        .groupBy("fiscal")
        .as("deliverables"),
      "deliverables.fiscal",
      "fy.id"
    )
    .leftJoin(
      knex(`${contractResourceTable} as cr`)
        .join(`${invoiceDetail} as i`, { "cr.id": "i.contract_resource_id" })
        .select("cr.fiscal")
        .sum("i.unit_amount as invoiced_hours")
        .where("cr.contract_id", id)
        .groupBy("cr.fiscal")
        .as("invoiced_resources"),
      "invoiced_resources.fiscal",
      "fy.id"
    )
    .leftJoin(
      knex(`${contractDeliverableTable} as cd`)
        .join(`${invoiceDetail} as i`, { "cd.id": "i.contract_deliverable_id" })
        .select("cd.fiscal", knex.raw("SUM(i.rate::NUMERIC::float8) as invoiced_expenses"))
        .where("cd.contract_id", id)
        .where("cd.is_expense", true)
        .groupBy("cd.fiscal")
        .as("invoiced_expenses"),
      "invoiced_expenses.fiscal",
      "fy.id"
    )
    .leftJoin(
      knex(`${contractDeliverableTable} as cd`)
        .join(`${invoiceDetail} as i`, { "cd.id": "i.contract_deliverable_id" })
        .select("cd.fiscal", knex.raw("SUM(i.rate::NUMERIC::float8) as invoiced_fees"))
        .where("cd.contract_id", id)
        .where("cd.is_expense", false)
        .groupBy("cd.fiscal")
        .as("invoiced_fees"),
      "invoiced_fees.fiscal",
      "fy.id"
    )
    .whereBetween("fy.id", [year - 1, year + 1]);
};

module.exports = {
  findAll,
  findById,
  findByProjectId,
  updateOne,
  addOne,
  findBudgetsByFiscal,
};
