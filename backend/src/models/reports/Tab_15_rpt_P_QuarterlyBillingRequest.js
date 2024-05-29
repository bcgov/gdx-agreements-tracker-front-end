const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} fiscal - The fiscal year(s) to retrieve totals for.
 * @returns {Promise}                        - A promise that resolves to the query result containing the totals for recoveries, expenses, net recoveries, and quarterly gross and net amounts.
 */

const getQuarterlySelectQuery = (quarter) => {
  return knex
    .select(
      "id",
      "project_deliverable_id",
      "fiscal",
      "client_coding_id",
      "contract_id",
      "notes",
      "detail_amount",
      "recovery_area",
      "resource_type",
      "stob",
      { quarter },
      `q${quarter}_recovered AS recovered`,
      `q${quarter}_amount AS amount`
    )
    .from("data.project_budget");
};

const getDeliverableTotals = (fiscal, quarter, project) => {
  return knex
    .select(
      knex.raw(
        "SUM(CASE WHEN pb.recovered = true THEN pb.amount ELSE 0.00::money END) AS deliverable_totals"
      )
    )
    .from(
      knex
        .union([
          getQuarterlySelectQuery(1),
          getQuarterlySelectQuery(2),
          getQuarterlySelectQuery(3),
          getQuarterlySelectQuery(4),
        ])
        .as("pb")
    )
    .innerJoin("data.project_deliverable AS pd", "pb.project_deliverable_id", "pd.id")
    .where("pb.recovered", true)
    .andWhere("pb.amount", "!=", knex.raw("0.00::money"))
    .andWhere("pd.project_id", project)
    .andWhere("pd.fiscal", fiscal)
    .andWhere("pb.quarter", quarter)
    .first();
};

const queries = {
  reportDeliverableTotals: (fiscal, quarter, project) =>
    getDeliverableTotals(fiscal, quarter, project),
  reportDeliverables: (fiscal, quarter, project) => {
    return knex
      .select([
        "pd.deliverable_name",
        knex.raw(
          "SUM(CASE WHEN pb.recovered = true THEN pb.amount ELSE 0.00::money END) AS total_amount"
        ),
      ])
      .from(
        knex
          .union([
            getQuarterlySelectQuery(1),
            getQuarterlySelectQuery(2),
            getQuarterlySelectQuery(3),
            getQuarterlySelectQuery(4),
          ])
          .as("pb")
      )
      .innerJoin("data.project_deliverable AS pd", "pb.project_deliverable_id", "pd.id")
      .where("pb.recovered", true)
      .andWhere("pb.amount", "!=", knex.raw("0.00::money"))
      .andWhere("pd.project_id", project)
      .andWhere("pd.fiscal", fiscal)
      .andWhere("pb.quarter", quarter)
      .groupBy(["pd.deliverable_name"])
      .orderBy("pd.deliverable_name");
  },
  reportProject: (fiscal, quarter, project) => {
    return knex
      .select(
        "p.project_number",
        "p.project_name",
        knex.raw(
          "CASE WHEN p.project_status = 'Complete' THEN TRUE ELSE FALSE END AS is_completed"
        ),
        "cc.id AS client_coding_id",
        "cc.project_id",
        "fy.fiscal_year",
        "pb.quarter",
        "cc.client",
        "cc.responsibility_centre",
        "cc.service_line",
        "cc.stob",
        "cc.project_code",
        knex.raw("COALESCE(c.first_name, '') || ' ' || COALESCE(c.last_name, '') AS full_name"),
        "c.email",
        "c.contact_phone",
        "c.contact_title",
        "cc.contact_id",
        "jv.billed_date"
      )
      .from(
        knex
          .union([
            getQuarterlySelectQuery(1),
            getQuarterlySelectQuery(2),
            getQuarterlySelectQuery(3),
            getQuarterlySelectQuery(4),
          ])
          .as("pb")
      )
      .innerJoin("data.project_deliverable AS pd", "pb.project_deliverable_id", "pd.id")
      .innerJoin("data.fiscal_year AS fy", "pd.fiscal", "fy.id")
      .innerJoin("data.client_coding AS cc", "pb.client_coding_id", "cc.id")
      .innerJoin("data.contact AS c", "cc.contact_id", "c.id")
      .innerJoin("data.project AS p", "cc.project_id", "p.id")
      .innerJoin("data.jv AS jv", "cc.id", "jv.client_coding_id")
      .where("pb.recovered", true)
      .andWhere("pb.amount", "!=", knex.raw("0.00::money"))
      .andWhere("pd.project_id", project)
      .andWhere("pd.fiscal", fiscal)
      .andWhere("pb.quarter", quarter)
      .groupBy([
        "p.project_number",
        "p.project_name",
        "cc.id",
        "cc.project_id",
        "fy.fiscal_year",
        "pb.quarter",
        "c.first_name",
        "c.last_name",
        "cc.client",
        "cc.responsibility_centre",
        "cc.service_line",
        "cc.stob",
        "cc.project_code",
        "c.email",
        "c.contact_phone",
        "c.contact_title",
        "cc.contact_id",
        "p.project_status",
        "jv.billed_date",
      ])
      .first();
  },
};

module.exports = {
  required: ["fiscal", "quarter", "project_number"],
  getAll: async (query) => {
    try {
      const { fiscal, quarter, project } = query;

      const [reportDeliverables, reportProject, reportDeliverableTotals] = await Promise.all([
        queries.reportDeliverables(fiscal, quarter, project),
        queries.reportProject(fiscal, quarter, project),
        queries.reportDeliverableTotals(fiscal, quarter, project),
      ]);

      return { reportDeliverables, reportProject, reportDeliverableTotals };
    } catch (error) {
      console.error(error);

      return null;
    }
  },
};
