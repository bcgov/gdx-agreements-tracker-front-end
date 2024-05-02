const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const projectBudgetTable = `${dataBaseSchemas().data}.project_budget`;
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;
const contractsTable = `${dataBaseSchemas().data}.contract`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;
const clientCodingTable = `${dataBaseSchemas().data}.client_coding`;
const ministryTable = `${dataBaseSchemas().data}.ministry`;
const contactTable = `${dataBaseSchemas().data}.contact`;

const findAllById = (projectId) => {
  return knex(`${projectBudgetTable} as prb`)
    .select({
      id: "prb.id",
      q1_amount: "prb.q1_amount",
      q1_recovered: "prb.q1_recovered",
      q2_amount: "prb.q2_amount",
      q2_recovered: "prb.q2_recovered",
      q3_amount: "prb.q3_amount",
      q3_recovered: "prb.q3_recovered",
      q4_amount: "prb.q4_amount",
      q4_recovered: "prb.q4_recovered",
      fiscal: "fy.fiscal_year",
      notes: "prb.notes",
      project_deliverable_id: "prd.deliverable_name",
      detail_amount: "prb.detail_amount",
      recovery_area: "port.portfolio_name",
      resource_type: "prb.resource_type",
      responsibility_centre: knex
        .select("responsibility")
        .from(`${portfolioTable}`)
        .where({ id: knex.raw("prb.recovery_area") }), // Subquery for responsibility_centre
      service_line: knex
        .select("service_line")
        .from(`${portfolioTable}`)
        .where({ id: knex.raw("prb.recovery_area") }), // Subquery for service_line
      stob: "prb.stob",
      client_coding_id: "cc.program_area",
      contract_id: "cntr.co_number",
      total: knex.raw("prb.q1_amount + prb.q2_amount + prb.q3_amount + prb.q4_amount"),
    })
    .leftJoin(`${fiscalYearTable} as fy`, { "prb.fiscal": `fy.id` })
    .leftJoin(`${projectDeliverableTable} as prd`, { "prb.project_deliverable_id": "prd.id" })
    .leftJoin(`${portfolioTable} as port`, { "prb.recovery_area": "port.id" })
    .leftJoin(`${contractsTable} as cntr`, { "prb.contract_id": "cntr.id" })
    .leftJoin(`${clientCodingTable} as cc`, { "prb.client_coding_id": "cc.id" })
    .where({ "prd.project_id": projectId });
};

const findById = (id) => {
  return knex
    .select({
      id: "prb.id",
      q1_amount: "prb.q1_amount",
      q1_recovered: "prb.q1_recovered",
      q2_amount: "prb.q2_amount",
      q2_recovered: "prb.q2_recovered",
      q3_amount: "prb.q3_amount",
      q3_recovered: "prb.q3_recovered",
      q4_amount: "prb.q4_amount",
      q4_recovered: "prb.q4_recovered",
      total: knex.raw("prb.q1_amount + prb.q2_amount + prb.q3_amount + prb.q4_amount"),
      fiscal: knex.raw(
        "(SELECT json_build_object('value', prb.fiscal, 'label', COALESCE(fy.fiscal_year, '')))"
      ),
      notes: "prb.notes",
      project_deliverable_id: knex.raw(
        "(SELECT json_build_object('deliverable_name', COALESCE(prd.deliverable_name, ''), 'deliverable_id',prb.project_deliverable_id,'value', prb.project_deliverable_id))"
      ),
      detail_amount: "prb.detail_amount",
      recovery_area: knex.raw(
        "(SELECT json_build_object('portfolio_name', COALESCE(port.portfolio_name, ''), 'portfolio_abbrev', port.portfolio_abbrev, 'value', port.id))"
      ),
      resource_type: knex.raw(
        "(SELECT json_build_object('value', prb.resource_type, 'label', COALESCE(prb.resource_type, '')))"
      ),
      responsibility_centre: knex
        .select("responsibility")
        .from(`${portfolioTable}`)
        .where({ id: knex.raw("prb.recovery_area") }), // Subquery for responsibility_centre
      service_line: knex
        .select("service_line")
        .from(`${portfolioTable}`)
        .where({ id: knex.raw("prb.recovery_area") }), // Subquery for responsibility_centre
      stob: "prb.stob",
      client_coding_id: knex.raw(
        "(SELECT json_build_object('program_area', COALESCE(cc.program_area, ''), 'client', cc.client, 'ministry_short_name', min.ministry_short_name, 'value', prb.client_coding_id))"
      ),
      contract_id: knex.raw(`
        (SELECT json_build_object(
          'co_number', cr.co_number,
          'co_version', cr.co_version,
          'contract_number', cr.contract_number,
          'value', cr.id
        ))
      `),
    })
    .from(`${projectBudgetTable} as prb`)
    .leftJoin(`${fiscalYearTable} as fy`, { "prb.fiscal": `fy.id` })
    .leftJoin(`${projectDeliverableTable} as prd`, { "prb.project_deliverable_id": "prd.id" })
    .leftJoin(`${contractsTable} as cr`, { "prb.contract_id": "cr.id" })
    .leftJoin(`${portfolioTable} as port`, { "prb.recovery_area": "port.id" })
    .leftJoin(`${clientCodingTable} as cc`, { "prb.client_coding_id": "cc.id" })
    .leftJoin(`${contactTable} as con`, { "cc.contact_id": "con.id" })
    .leftJoin(`${ministryTable} as min`, { "con.ministry_id": "min.id" })
    .where("prb.id", id)
    .first();
};

// Update one.
const getResponsibilityServiceLine = (id) => {
  return knex
    .select({
      responsibility_centre: "port.responsibility",
      service_line: "port.service_line",
    })
    .from(`${portfolioTable} as port`)
    .where({ "port.id": id });
};

// Update one.
const updateOne = (body, id) => {
  return knex(projectBudgetTable).where("id", id).update(body);
};

// Add one.
const addOne = (newBudget) => {
  return knex(projectBudgetTable).insert(newBudget);
};

const findProjectBudgetByFiscal = (projectId) => {
  return knex
    .select({
      fiscal_year: "fy.fiscal_year",
      id: knex.raw("row_number() OVER ()"),
      recovered_amount: knex.raw("SUM(q1_amount + q2_amount + q3_amount + q4_amount)"),
      balance_remaining: knex.raw(
        "SUM(detail_amount) - SUM(q1_amount + q2_amount + q3_amount + q4_amount)"
      ),
    })
    .sum("q1_amount as q1_amount")
    .sum("q2_amount as q2_amount")
    .sum("q3_amount as q3_amount")
    .sum("q4_amount as q4_amount")
    .sum("detail_amount as recovery_amount")
    .from(`${projectBudgetTable} as pb`)
    .leftJoin(`${projectDeliverableTable} as pd`, { "pb.project_deliverable_id": "pd.id" })
    .join(`${fiscalYearTable} as fy`, "pd.fiscal", "fy.id")
    .where("pd.project_id", projectId)
    .groupBy("fy.fiscal_year");
};

const findPortfolioBreakdown = (projectId) => {
  return knex
    .select({
      recovery_area: "port.portfolio_name",
      recovery_amount: knex.raw("SUM(pb.detail_amount)"),
      id: knex.raw("row_number() OVER ()"),
      recovered_to_date: knex.raw(
        "SUM( CASE WHEN q1_recovered THEN q1_amount WHEN q2_recovered THEN q2_amount WHEN q3_recovered THEN q3_amount WHEN q4_recovered THEN q4_amount ELSE 0::money END )"
      ),
      balance_remaining: knex.raw(
        "SUM(detail_amount) - SUM( CASE WHEN q1_recovered THEN q1_amount WHEN q2_recovered THEN q2_amount WHEN q3_recovered THEN q3_amount WHEN q4_recovered THEN q4_amount ELSE 0::money END)"
      ),
    })
    .from(`${projectBudgetTable} as pb`)
    .leftJoin(`${projectDeliverableTable} as pd`, { "pb.project_deliverable_id": "pd.id" })
    .leftJoin(`${portfolioTable} as port`, { "pb.recovery_area": "port.id" })
    .where("pd.project_id", projectId)
    .groupBy("port.portfolio_name");
};

const findDeliverablesBreakdown = (projectId) => {
  return knex
    .select({
      deliverable_name: "pd.deliverable_name",
      recovery_amount: knex.raw("SUM(pb.detail_amount)"),
      id: knex.raw("row_number() OVER ()"),
      recovered_to_date: knex.raw(
        "SUM( CASE WHEN q1_recovered THEN q1_amount WHEN q2_recovered THEN q2_amount WHEN q3_recovered THEN q3_amount WHEN q4_recovered THEN q4_amount ELSE 0::money END )"
      ),
      balance_remaining: knex.raw(
        "SUM(detail_amount) - SUM( CASE WHEN q1_recovered THEN q1_amount WHEN q2_recovered THEN q2_amount WHEN q3_recovered THEN q3_amount WHEN q4_recovered THEN q4_amount ELSE 0::money END)"
      ),
    })
    .from(`${projectBudgetTable} as pb`)
    .leftJoin(`${projectDeliverableTable} as pd`, { "pb.project_deliverable_id": "pd.id" })
    .where("pd.project_id", projectId)
    .groupBy("pd.deliverable_name");
};

const findProjectRecoverableBreakdown = (projectId) => {
  return knex
    .select({
      id: knex.raw("row_number() OVER ()"),
      total_project_budget: knex.raw("SUM(detail_amount)"),
      total_recoverable_amount: knex.raw(`
      SUM(
        CASE
          WHEN q1_recovered THEN q1_amount
          WHEN q2_recovered THEN q2_amount
          WHEN q3_recovered THEN q3_amount
          WHEN q4_recovered THEN q4_amount
          ELSE 0::money
        END
      )
    `),
    })
    .from(`${projectBudgetTable} as pb`)
    .leftJoin(`${projectDeliverableTable} as pd`, { "pb.project_deliverable_id": "pd.id" })
    .where("pd.project_id", projectId);
};

const removeOne = (projectId) => {
  return knex(`${projectBudgetTable} as prb`).where("prb.id", projectId).del();
};

const findRecoveredBudgets = (quarter, projectId, fiscal, portfolio) => {
  return knex
    .select()
    .sum(`q${quarter}_amount`)
    .from(`${projectBudgetTable} as pb`)
    .leftJoin(`${projectDeliverableTable} as pd`, { "pb.project_deliverable_id": "pd.id" })
    .where("pd.project_id", projectId)
    .where(`q${quarter}_recovered`, true)
    .where("pb.fiscal", fiscal)
    .where("pb.client_coding_id", portfolio)
    .first();
};

module.exports = {
  findAllById,
  findById,
  updateOne,
  addOne,
  findProjectBudgetByFiscal,
  findPortfolioBreakdown,
  findDeliverablesBreakdown,
  findProjectRecoverableBreakdown,
  getResponsibilityServiceLine,
  removeOne,
  findRecoveredBudgets,
};
