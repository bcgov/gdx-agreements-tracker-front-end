const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves base historical recoveries to be combined in the final query.
 *
 * @param   {string}            fiscal - Fiscal year value to filter the report.
 * @returns {Knex.QueryBuilder}        Knex query builder for fetching report data.
 */
const queries = {
  billing: () => {
    return knex
      .with(
        "historical_projects",
        knex
          .select(
            "hp.project_number",
            "hp.project_name",
            "hp.total_project_budget",
            "fy.fiscal_year as budget_fiscal",
            "hpb.q1",
            "hpb.q2",
            "hpb.q3",
            "hpb.q4",
            knex.raw(
              `COALESCE(hpb.q1, '0.00') + COALESCE(hpb.q2, '0.00') + COALESCE(hpb.q3, '0.00') + COALESCE(hpb.q4, '0.00') AS total_recovered`
            )
          )
          .from("data.historical_projects as hp")
          .innerJoin(
            "data.historical_project_billing as hpb",
            "hp.project_number",
            "hpb.project_number"
          )
          .innerJoin("data.fiscal_year as fy", "hpb.fiscal_year", "fy.id")
          .groupBy(
            "hp.project_number",
            "hp.project_name",
            "hp.total_project_budget",
            "fy.fiscal_year",
            "hpb.q1",
            "hpb.q2",
            "hpb.q3",
            "hpb.q4"
          )
      )
      .with(
        "current_projects",
        knex
          .select(
            "p.project_number",
            "p.project_name",
            "p.total_project_budget",
            "fy.fiscal_year",
            knex.raw(`SUM(CASE WHEN jv.quarter = '1' THEN jv.amount ELSE NULL END) AS q1`),
            knex.raw(`SUM(CASE WHEN jv.quarter = '2' THEN jv.amount ELSE NULL END) AS q2`),
            knex.raw(`SUM(CASE WHEN jv.quarter = '3' THEN jv.amount ELSE NULL END) AS q3`),
            knex.raw(`SUM(CASE WHEN jv.quarter = '4' THEN jv.amount ELSE NULL END) AS q4`),
            knex.raw(`SUM(jv.amount) AS total_recovered`)
          )
          .from("data.project as p")
          .innerJoin("data.jv as jv", "p.id", "jv.project_id")
          .innerJoin("data.fiscal_year as fy", "jv.fiscal_year_id", "fy.id")
          .groupBy("p.project_number", "p.project_name", "p.total_project_budget", "fy.fiscal_year")
      )
      .unionAll([
        knex
          .select(
            "project_number",
            "project_name",
            "total_project_budget",
            "budget_fiscal",
            "q1",
            "q2",
            "q3",
            "q4",
            knex.raw(
              `COALESCE(q1, '0.00') + COALESCE(q2, '0.00') + COALESCE(q3, '0.00') + COALESCE(q4, '0.00') AS total_recovered`
            )
          )
          .from("historical_projects"),
        knex
          .select(
            "project_number",
            "project_name",
            "total_project_budget",
            "fiscal_year",
            "q1",
            "q2",
            "q3",
            "q4",
            "total_recovered"
          )
          .from("current_projects"),
      ]);
  },
};

module.exports = {
  required: ["fiscal"],
  getAll: async () => {
    const [reportBilling] = await Promise.all([queries.billing()]);

    return { reportBilling };
  },
};
