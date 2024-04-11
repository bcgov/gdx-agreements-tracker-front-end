const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { getProjectById } = require("@models/reports/useProject");
const {
  projectBudgetTable,
  projectDeliverableTable,
  clientCodingTable,
  contactTable,
  jvTable,
} = require("@models/useDbTables");

/**
 * Get array of deliverables with summed budget amounts.
 *
 * @param   {int}   projectId The Project id for a specific project.
 * @param   {int}   fiscal    The fiscal for the project.
 * @param   {int}   quarter   The quarter for the fiscal of the project.
 * @returns {any[]}
 */
const getDeliverableBudgets = (projectId, fiscal, quarter) => {
  return knex(`${projectBudgetTable} as pb`)
    .select("pd.deliverable_name", {
      amount: knex.raw(`SUM(pb.q${quarter}_amount::numeric::float8)`),
    })
    .join(`${projectDeliverableTable} as pd`, "pb.project_deliverable_id", "pd.id")
    .where("pd.project_id", projectId)
    .andWhere("pb.fiscal", fiscal)
    .groupBy("pd.id")
    .orderBy("pd.deliverable_name", "ASC")
    .having(knex.raw(`SUM(pb.q${quarter}_amount::numeric::float8)`), ">", 0);
};

/**
 * Get project's journal voucher data.
 *
 * @param   {int}   projectId The Project id for a specific project.
 * @param   {int}   fiscal    The fiscal for the project.
 * @param   {int}   quarter   The quarter for the fiscal of the project.
 * @returns {any[]}
 */
const getJournalVoucher = (projectId, fiscal, quarter) => {
  return knex(`${jvTable}`)
    .select("*")
    .where("project_id", projectId)
    .andWhere("fiscal_year_id", fiscal)
    .andWhere("quarter", quarter)
    .first();
};

/**
 * Get project's client coding data.
 *
 * @param   {int}   projectId The Project id for a specific project.
 * @returns {any[]}
 */
const getClientCoding = (projectId) => {
  return knex(`${clientCodingTable} as cc`)
    .select("cc.*", "c.*", { client_name: knex.raw("c.last_name || ', ' || c.first_name") })
    .join(`${contactTable} as c`, "cc.contact_id", "c.id")
    .where("cc.project_id", projectId)
    .first();
};

module.exports = {
  getProjectById,
  getDeliverableBudgets,
  getJournalVoucher,
  getClientCoding,
};
