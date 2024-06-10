// Libs
const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const log = require("../../facilities/logging")(module.filename);

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  project: (project_id) =>
    knex("project as p")
      .select({
        project_number: "project_number",
        project_name: "project_name",
        project_manager: knex.raw("c.last_name || ', ' || c.first_name"),
        start_date: knex.raw("to_char(p.planned_start_date, 'dd-Mon-yy')"),
        end_date: knex.raw("to_char(p.planned_end_date, 'dd-Mon-yy')"),
      })
      .leftJoin(`data.contact as c`, "p.project_manager", "c.id")
      .where("p.id", project_id)
      .first(),

  quarterlyFiscal: (project_id) =>
    knex("fiscal_year as fy")
      .select({
        id: "pd.id",
        deliverable_name: "deliverable_name",
        detail_amount: "detail_amount",
        q1_amount: "q1_amount",
        q2_amount: "q2_amount",
        q3_amount: "q3_amount",
        q4_amount: "q4_amount",
        resource_type: "resource_type",
        recovery_area: "portfolio_abbrev",
        responsibility: "responsibility",
        service_line: "port.service_line",
        stob: "pb.stob",
        expense_authority_name: "cc.expense_authority_name",
        fiscal_year: "fiscal_year",
        client: "pb.client_coding_id",
      })
      .leftJoin(`data.project_deliverable  as pd`, { "fy.id": "pd.fiscal" })
      .leftJoin(`data.project_budget  as pb`, { "pd.id": "pb.project_deliverable_id" })
      .leftJoin(`data.client_coding as cc`, { "cc.id": "pb.client_coding_id" })
      .leftJoin(`data.portfolio as port`, { "port.id": "pb.recovery_area" })
      .where("pd.project_id", project_id)
      .orderBy("fy.fiscal_year")
      .orderBy("pb.client_coding_id"),

  subtotals: (project_id) =>
    knex("fiscal_year as fy")
      .select({
        fiscal_year: "fy.fiscal_year",
        client: "pb.client_coding_id",
      })
      .sum({
        detail_amount: "detail_amount",
        q1_amount: "q1_amount",
        q2_amount: "q2_amount",
        q3_amount: "q3_amount",
        q4_amount: "q4_amount",
      })
      .leftJoin("data.project_deliverable as pd", "fy.id", "pd.fiscal")
      .leftJoin("data.project_budget as pb", "pd.id", "pb.project_deliverable_id")
      .leftJoin("data.client_coding as cc", "cc.id", "pb.client_coding_id")
      .where("pd.project_id", project_id)
      .groupBy("fy.fiscal_year")
      .groupBy("pb.client_coding_id")
      .orderBy("fy.fiscal_year"),

  totals: (project_id) =>
    knex("fiscal_year as fy")
      .select({
        fiscal_year: "fy.fiscal_year",
      })
      .sum({
        detail_amount: "detail_amount",
        q1_amount: "q1_amount",
        q2_amount: "q2_amount",
        q3_amount: "q3_amount",
        q4_amount: "q4_amount",
      })
      .leftJoin(`data.project_deliverable  as pd`, { "fy.id": "pd.fiscal" })
      .leftJoin(`data.project_budget  as pb`, { "pd.id": "pb.project_deliverable_id" })
      .leftJoin(`data.client_coding as cc`, { "cc.id": "pb.client_coding_id" })
      .where("pd.project_id", project_id)
      .groupBy("fy.fiscal_year")
      .orderBy("fy.fiscal_year"),
};

/**
 * Merges fiscal year data with subtotals and totals data.
 *
 * @param   {Array}  fiscalYearData - Data grouped by fiscal year
 * @param   {Array}  subtotalData   - Subtotal data
 * @param   {Array}  totalData      - Total data
 * @returns {object}                - Merged fiscal summary data with totals.
 */
const mergeFiscalWithTotals = (fiscalYearData, subtotalData, totalData) => {
  // Helper function to group data by a key
  const groupBy = (data, key) =>
    data.reduce((acc, item) => {
      return { ...acc, [item[key]]: [...(acc[item[key]] || []), item] };
    }, {});

  // Group data by fiscal year
  const fiscalYearGroups = groupBy(fiscalYearData, "fiscal_year");
  const subtotalGroups = groupBy(subtotalData, "fiscal_year");
  const totalGroups = groupBy(totalData, "fiscal_year");

  // Map the grouped data to the required format
  return Object.entries(fiscalYearGroups).map(([fiscal_year, entries]) => {
    const subtotalsByFiscal = subtotalGroups[fiscal_year] || [];
    const totalsByFiscal = totalGroups[fiscal_year] ? totalGroups[fiscal_year][0] : {};

    // Group entries by client
    const clientGroups = groupBy(entries, "client");

    // Map clients to their respective data and subtotals
    const clients = Object.entries(clientGroups).map(([client, data]) => ({
      client: parseInt(client, 10),
      subtotals: subtotalsByFiscal.find((subtotal) => subtotal.client === parseInt(client, 10)),
      data: data,
    }));

    return {
      fiscal_year,
      details: {
        clients,
        totals: totalsByFiscal,
      },
    };
  });
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object} options         - Options object containing fiscal year.
 * @param   {string} options.project - The project id to filter on project id.  This param may be called project_id.
 * @returns {object}                 - An object containing fiscal year, report, and report total.
 */
const getAll = async ({ project: project_id }) => {
  try {
    // Await all promises in parallel
    const [projectData, quarterlyFiscalData, subtotalData, totalData] = await Promise.all([
      queries.project(project_id),
      queries.quarterlyFiscal(project_id),
      queries.subtotals(project_id),
      queries.totals(project_id),
    ]);

    const reportDataMergedWithTotals = mergeFiscalWithTotals(
      quarterlyFiscalData,
      subtotalData,
      totalData
    );

    // Take the grouped data with totals and return it to the Controller.
    return {
      project: projectData,
      report: reportDataMergedWithTotals,
    };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

module.exports = {
  required: ["project"],
  getAll,
};
