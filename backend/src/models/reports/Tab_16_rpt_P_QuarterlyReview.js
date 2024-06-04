// Libs
const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { findById } = require("@models/projects");
const log = require("../../facilities/logging")(module.filename);

// Constants
const {
  projectBudgetTable,
  projectDeliverableTable,
  portfolioTable,
  clientCodingTable,
  fiscalYearTable,
} = require("@models/useDbTables");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  project: (project) => findById(project),
  quarterlyFiscal: (project) =>
    knex("fiscal_year as fy")
      .select({
        fiscal_year: "fiscal_year",
        detail_total: knex.sum("detail_amount"),
        q1_total: knex.sum("q1_amount"),
        q2_total: knex.sum("q2_amount"),
        q3_total: knex.sum("q3_amount"),
        q4_total: knex.sum("q4_amount"),
        client: "pb.client_coding_id",
      })
      .leftJoin(`${projectDeliverableTable} as pd`, { "fy.id": "pd.fiscal" })
      .leftJoin(`${projectBudgetTable} as pb`, { "pd.id": "pb.project_deliverable_id" })
      .where("pd.project_id", project)
      .groupBy("fy.fiscal_year", "pb.client_coding_id")
      .orderBy("fy.fiscal_year", "pb.client_coding_id"),
  quarterlyDeliverables: (project) => {},
};

// Get the quarterly fiscal summary for a specific project by id
const getQuarterlyFiscalSummaries = (projectId) => {
  log.info(`INSIDE getQuarterlyFiscalSummaries:${projectId}`);
  // Client specific summaries grouped by fiscal year
  return knex(`${fiscalYearTable} as fy`)
    .select({
      fiscal_year: "fiscal_year",
      detail_total: knex.sum("detail_amount"),
      q1_total: knex.sum("q1_amount"),
      q2_total: knex.sum("q2_amount"),
      q3_total: knex.sum("q3_amount"),
      q4_total: knex.sum("q4_amount"),
      client: "pb.client_coding_id",
    })
    .leftJoin(`${projectDeliverableTable} as pd`, { "fy.id": "pd.fiscal" })
    .leftJoin(`${projectBudgetTable} as pb`, { "pd.id": "pb.project_deliverable_id" })
    .where("pd.project_id", projectId)
    .groupBy("fy.fiscal_year", "pb.client_coding_id")
    .orderBy("fy.fiscal_year", "pb.client_coding_id");
};

// Get the breakdown for deliverables for a specific project by id and fiscal_summary
const getQuarterlyDeliverables = (projectId, fiscal_summary) => {
  let data = [];
  for (let fiscal in fiscal_summary) {
    data.push(
      knex(`${projectDeliverableTable} as pd`)
        .select({
          fiscal_year: "fy.fiscal_year",
          id: "pd.id",
          deliverable_name: "deliverable_name",
          detail_amount: "detail_amount",
          q1_amount: "q1_amount",
          q2_amount: "q2_amount",
          q3_amount: "q3_amount",
          q4_amount: "q4_amount",
          resource_type: "resource_type",
          porfolio_abbrev: "portfolio_abbrev",
          responsibility: "responsibility",
          service_line: "port.service_line",
          stob: "pb.stob",
          expense_authority_name: "expense_authority_name",
        })
        .leftJoin(`${projectBudgetTable} as pb`, { "pd.id": "pb.project_deliverable_id" })
        .leftJoin(`${clientCodingTable} as cc`, { "cc.id": "pb.client_coding_id" })
        .leftJoin(`${portfolioTable} as port`, { "port.id": "pb.recovery_area" })
        .leftJoin(`${fiscalYearTable} as fy`, { "fy.id": "pd.fiscal" })
        .where({ "pd.project_id": projectId })
        .andWhere({ "fy.fiscal_year": fiscal_summary[fiscal].fiscal_year })
        // For client specific breakdown
        .andWhere({ "cc.id": fiscal_summary[fiscal].client })
        .orderBy("deliverable_name")
        // Construct the array of fiscal breakdown and summaries
        .then((results) => {
          return {
            fiscal_year: fiscal_summary[fiscal].fiscal_year,
            q1_client_total: fiscal_summary[fiscal].q1_total,
            q2_client_total: fiscal_summary[fiscal].q2_total,
            q3_client_total: fiscal_summary[fiscal].q3_total,
            q4_client_total: fiscal_summary[fiscal].q4_total,
            detail_client_total: fiscal_summary[fiscal].detail_total,
            details: results,
          };
        })
    );
  }
  return Promise.all(data);
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object} options            - Options object containing fiscal year.
 * @param   {string} options.project    - The project id to filter on project id.  This param may be called project_id.
 * @returns {object}                    - An object containing fiscal year, report, and report total.
 */
const getAll = async ({ project: project_id }) => {
  try {
    // Await all promises in parallel
    const [project, fiscal, deliverables] = await Promise.all([
      queries.project(project_id),
      queries.quarterlyFiscal(project_id),
      queries.quarterlyDeliverables(project_id),
    ]);

    return { project, fiscal, deliverables };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
//  required can be fiscal, date, portfolio, etc.
module.exports = {
  // delete these three once model is updated
  //   findById, // delete
  //   getQuarterlyFiscalSummaries, // delete
  //   getQuarterlyDeliverables, // delete
  required: ["project"],
  getAll,
};
