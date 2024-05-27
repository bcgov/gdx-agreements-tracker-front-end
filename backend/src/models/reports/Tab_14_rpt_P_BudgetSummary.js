// Libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);
const { findById, findMostRecentStatusById } = require("@models/projects");
const { getCurrentDate } = require("@controllers/reports/helpers");

// /**
//  * Retrieves the data for various financial metrics based on the fiscal year.
//  *
//  * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
//  * @returns {Promise}                            - A promise that resolves to the query result
//  */
const {
  projectBudgetTable,
  projectDeliverableTable,
  contractTable,
  fiscalYearTable,
  changeRequestTable,
  changeRequestTypeLookupTable,
  changeRequestTypeTable,
  supplierTable,
} = require("@models/useDbTables");
const { dateFormatShortYear } = require("@helpers/standards");
const queries = {
  budget: (projectId) => {
    return knex
      .with(
        "deliverables_data",
        knex
          .select([
            "pd.id",
            "fy.fiscal_year",
            "pd.deliverable_name",
            "pd.recoverable_amount AS recovery_amount",
            "pb.detail_amount",
            "pb.recovered_to_date",
            "pb.remaining",
          ])
          .from({ pd: "data.project_deliverable" })
          .leftJoin(
            knex
              .select([
                "pb.project_deliverable_id",
                knex.raw("SUM(pb.detail_amount) AS detail_amount"),
                knex.raw("SUM(pb.recovered_to_date) AS recovered_to_date"),
                knex.raw("SUM(pb.remaining) AS remaining"),
              ])
              .from(
                knex
                  .select([
                    "project_deliverable_id",
                    "detail_amount",
                    knex.raw(`CAST(
                    CASE WHEN q1_recovered THEN q1_amount::numeric ELSE 0 END +
                    CASE WHEN q2_recovered THEN q2_amount::numeric ELSE 0 END +
                    CASE WHEN q3_recovered THEN q3_amount::numeric ELSE 0 END +
                    CASE WHEN q4_recovered THEN q4_amount::numeric ELSE 0 END
                  AS money) AS recovered_to_date`),
                    knex.raw(`CAST(
                    detail_amount::numeric - (
                      CASE WHEN q1_recovered THEN q1_amount::numeric ELSE 0 END +
                      CASE WHEN q2_recovered THEN q2_amount::numeric ELSE 0 END +
                      CASE WHEN q3_recovered THEN q3_amount::numeric ELSE 0 END +
                      CASE WHEN q4_recovered THEN q4_amount::numeric ELSE 0 END
                    )
                  AS money) AS remaining`),
                  ])
                  .from("data.project_budget")
                  .as("pb")
              )
              .groupBy("pb.project_deliverable_id")
              .as("pb"),
            "pb.project_deliverable_id",
            "pd.id"
          )
          .leftJoin({ fy: "data.fiscal_year" }, "pd.fiscal", "fy.id")
          .where("pd.project_id", projectId)
          .orderBy("fy.fiscal_year")
      )
      .with(
        "totals_data",
        knex
          .select([
            "pd_sums.deliverable_amount_sum as current_budget",
            "pd_sums.recoverable_amount_sum as recovery_amount",
            "fy.fiscal_year",
            "pb_sums.recovered_to_date",
            "pb_sums.balance_remaining",
          ])
          .from(
            knex
              .select([
                knex.raw("SUM(pd.deliverable_amount) AS deliverable_amount_sum"),
                knex.raw("SUM(pd.recoverable_amount) AS recoverable_amount_sum"),
                "pd.fiscal",
              ])
              .from({ pd: "data.project_deliverable" })
              .where("pd.project_id", projectId)
              .groupBy("pd.fiscal")
              .as("pd_sums")
          )
          .leftJoin({ fy: "data.fiscal_year" }, "pd_sums.fiscal", "fy.id")
          .leftJoin(
            knex
              .select([
                "pd.fiscal",
                knex.raw(`CAST(SUM(
                CASE WHEN pb.q1_recovered THEN pb.q1_amount::numeric ELSE 0 END +
                CASE WHEN pb.q2_recovered THEN pb.q2_amount::numeric ELSE 0 END +
                CASE WHEN pb.q3_recovered THEN pb.q3_amount::numeric ELSE 0 END +
                CASE WHEN pb.q4_recovered THEN pb.q4_amount::numeric ELSE 0 END
              ) AS money) AS recovered_to_date`),
                knex.raw(`CAST(SUM(pb.detail_amount::numeric) - SUM(
                CASE WHEN pb.q1_recovered THEN pb.q1_amount::numeric ELSE 0 END +
                CASE WHEN pb.q2_recovered THEN pb.q2_amount::numeric ELSE 0 END +
                CASE WHEN pb.q3_recovered THEN pb.q3_amount::numeric ELSE 0 END +
                CASE WHEN pb.q4_recovered THEN pb.q4_amount::numeric ELSE 0 END
              ) AS money) AS balance_remaining`),
              ])
              .from({ pd: "data.project_deliverable" })
              .leftJoin({ pb: "data.project_budget" }, "pb.project_deliverable_id", "pd.id")
              .where("pd.project_id", projectId)
              .groupBy("pd.fiscal")
              .as("pb_sums"),
            "pd_sums.fiscal",
            "pb_sums.fiscal"
          )
      )
      .select(
        knex.raw(`json_agg(
        json_build_object(
          'deliverables', d.deliverables,
          'deliverable_totals', json_build_object(
            'fiscal_year', t.fiscal_year,
            'current_budget', t.current_budget,
            'recovery_amount', t.recovery_amount,
            'recovered_td', t.recovered_to_date,
            'balance_remaining', t.balance_remaining
          )
        )
      ) AS result`)
      )
      .from(
        knex
          .select([
            "fiscal_year",
            knex.raw(`json_agg(
            json_build_object(
              'fiscal', fiscal_year,
              'deliverable_name', deliverable_name,
              'detail_amount', detail_amount,
              'recoverable', recovery_amount,
              'recovered_to_date', recovered_to_date,
              'remaining', remaining
            )
          ) AS deliverables`),
          ])
          .from("deliverables_data")
          .groupBy("fiscal_year")
          .as("d")
      )
      .join("totals_data as t", "d.fiscal_year", "t.fiscal_year");
  },
  projectBudgetTotals: (projectId) => {
    return knex(`${projectDeliverableTable} as pd`)
      .select(
        knex.raw("SUM(pd.deliverable_amount) AS deliverable_amount_sum"),
        knex.raw("SUM(pd.recoverable_amount) AS recoverable_amount_sum"),
        knex.raw(`
        (
          SELECT CAST(SUM(
                        CASE WHEN pb.q1_recovered THEN pb.q1_amount::numeric ELSE 0 END +
                        CASE WHEN pb.q2_recovered THEN pb.q2_amount::numeric ELSE 0 END +
                        CASE WHEN pb.q3_recovered THEN pb.q3_amount::numeric ELSE 0 END +
                        CASE WHEN pb.q4_recovered THEN pb.q4_amount::numeric ELSE 0 END
                      ) AS money) AS recovered_to_date
          FROM project_budget pb
          LEFT JOIN project_deliverable pd ON pd.id = pb.project_deliverable_id
          WHERE pd.project_id = ${projectId}
        ) AS recovered_to_date
      `),
        knex.raw(`
        (
          SELECT CAST(SUM(pb.detail_amount::numeric) - SUM(
                        CASE WHEN pb.q1_recovered THEN pb.q1_amount::numeric ELSE 0 END +
                        CASE WHEN pb.q2_recovered THEN pb.q2_amount::numeric ELSE 0 END +
                        CASE WHEN pb.q3_recovered THEN pb.q3_amount::numeric ELSE 0 END +
                        CASE WHEN pb.q4_recovered THEN pb.q4_amount::numeric ELSE 0 END
                      ) AS money) AS recovered_to_date
          FROM project_budget pb
          LEFT JOIN project_deliverable pd ON pd.id = pb.project_deliverable_id
          WHERE pd.project_id = ${projectId}
        ) AS balance_remaining
      `)
      )
      .where("pd.project_id", projectId).first()
  },
  deliverable_summaries: (projectId) => {
    return knex.raw(
      `SELECT
      fiscal_year,
      current_budget,
      recovery_amount,
      recovered_td,
      current_budget - recovered_td AS balance_remaining
      FROM
      (SELECT
      pd.fiscal,
      SUM(q1_amount + q2_amount + q3_amount + q4_amount) AS recovered_td --good
      FROM ${projectBudgetTable} AS pb

      LEFT JOIN ${projectDeliverableTable} AS pd ON pb.project_deliverable_id = pd.id
      WHERE pd.project_id = ${projectId}
      GROUP BY pd.fiscal) as q1
      INNER JOIN
      (SELECT
       fiscal,
      SUM(deliverable_amount) AS current_budget,
      SUM(recoverable_amount) AS recovery_amount
      FROM ${projectDeliverableTable}
      WHERE project_id = ${projectId}
      GROUP BY fiscal) AS q2
      ON q2.fiscal = q1.fiscal
      LEFT JOIN ${fiscalYearTable} AS fy ON fy.id = q1.fiscal`
    );
  },
  change_request: (projectId) => {
    return knex(`${changeRequestTable} as cr`)
      .select({
        version: "cr.version",
        initiated_by: "cr.initiated_by",
        initiation_date: knex.raw(`TO_CHAR(cr.initiation_date :: DATE, '${dateFormatShortYear}')`),
        summary: "cr.summary",
        type: knex.raw(`string_agg(crt.crtype_name, ', ')`),
      })
      .leftJoin(`${changeRequestTypeLookupTable} as crtl`, { "crtl.change_request_id": "cr.id" })
      .leftJoin(`${changeRequestTypeTable} as crt`, { "crtl.crtype_id": "crt.id" })
      .groupBy("cr.id")
      .where({ "cr.link_id": projectId })
      .orderBy("cr.version");
  },
  getContracts: (projectId) => {
    return knex(`${contractTable} as ct`)
      .select("*", {
        supplier: "st.supplier_name",
        end_date: knex.raw(`TO_CHAR(ct.end_date :: DATE, '${dateFormatShortYear}')`),
        fiscal: "fy.fiscal_year",
        contract_amount: knex.raw("ct.total_fee_amount + ct.total_expense_amount"),
      })
      .leftJoin(`${supplierTable} as st`, { "st.id": "ct.supplier_id" })
      .leftJoin(`${fiscalYearTable} as fy`, { "fy.id": "ct.fiscal" })
      .where({ "ct.project_id": projectId })
      .orderBy("ct.co_number");
  },
  contract_summaries: (projectId) => {
    return knex(`${contractTable} as ct`)
      .select({
        fiscal: "fy.fiscal_year",
        total_contract_amount: knex.raw("SUM(ct.total_fee_amount) + SUM(ct.total_expense_amount)"),
        total_fee_amount: knex.sum("ct.total_fee_amount"),
        total_expense_amount: knex.sum("ct.total_expense_amount"),
      })
      .leftJoin(`${fiscalYearTable} as fy`, { "fy.id": "ct.fiscal" })
      .groupBy("fy.fiscal_year")
      .where({ "ct.project_id": projectId });
  },
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object} options            - Options object containing fiscal year.
 * @param   {string} options.fiscal     - The fiscal year to retrieve data for.
 * @param   {string} options.quarter    - The fiscal year to retrieve data for.
 * @param            options.project_id - The project id to filter on project id.  This param may be called project.
 * @param            options.project    - The project id to filter on project id.  This param may be called project_id.
 * @returns {object}                    - An object containing fiscal year, report, and report total.
 */
// add other parameters if needed, like quarter, portfolio, date etc.
const getAll = async ({ project }) => {
  const projectId = Number(project);
  try {
    const [
      project,
      budget,
      status,
      deliverable_summaries,
      change_request,
      contract,
      contract_summaries,
      report_date,
      projectBudgetTotals,
    ] = await Promise.all([
      findById(projectId),
      queries.budget(projectId),
      findMostRecentStatusById(projectId),
      queries.deliverable_summaries(projectId),
      queries.change_request(projectId),
      queries.getContracts(projectId),
      queries.contract_summaries(projectId),
      getCurrentDate(),
      queries.projectBudgetTotals(projectId),
    ]);
    return {
      project,
      budget,
      status,
      deliverable_summaries,
      change_request,
      contract,
      contract_summaries,
      report_date,
      projectBudgetTotals,
    };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
//  required can be fiscal, date, portfolio, etc.
module.exports = { required: ["project"], getAll };
