// libs
const { knex } = require("@database/databaseConnection")();
const { getCurrentDate } = require("@controllers/reports/helpers");

/**
 * Retrieves the data for various financial metrics based on the fiscal year and quarter
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: (fiscal, quarter) =>
    knex
      .select()
      .fromRaw(
        `
          (
            SELECT
              fy.id AS fiscal,
              quarter,
              p.project_number,
              p.project_name,
              jv.jv_number,
              to_char(jv.billed_date, 'DD-Mon-YY') as date,
              jv.amount
            FROM
              fiscal_year fy
              INNER JOIN (project p RIGHT JOIN jv ON p.id = jv.project_id)
              ON fy.id = jv.fiscal_year_id
            ORDER BY
              p.project_number,
              fiscal_year DESC,
              quarter ASC
          ) as base
        `
      )
      .where({
        fiscal: fiscal,
        quarter: quarter,
      }),

  totals: (fiscal, quarter) =>
    knex
      .select()
      .fromRaw(
        `
          (
            SELECT
              fy.id AS fiscal,
              quarter,
              p.project_number,
              p.project_name,
              jv.jv_number,
              to_char(jv.billed_date, 'DD-Mon-YY') as date,
              jv.amount
            FROM
              fiscal_year fy
              INNER JOIN (project p RIGHT JOIN jv ON p.id = jv.project_id)
              ON fy.id = jv.fiscal_year_id
            ORDER BY
              p.project_number,
              fiscal_year DESC,
              quarter ASC
          ) as base
        `
      )
      .where({
        fiscal: fiscal,
        quarter: quarter,
      })
      .sum({ amount: "amount" }),
};

module.exports = {
  required: ["fiscal", "quarter"],

  getAll: async ({ fiscal, quarter }) => {
    try {
      // Use Promise.all to execute all three queries in parallel, providing the 'fiscal' parameter.
      const fetchedQueryResults = await Promise.all([
        queries?.fiscal(fiscal),
        queries?.report(fiscal, quarter),
        queries?.totals(fiscal, quarter),
        getCurrentDate(),
        "rpt_PF_JVsforFiscal-Quarter"
      ]);

      // Extract the results from the fetched Query Results into individual variables
      const [
        { fiscal_year }, // the result of the 'fiscal' query
        report, // the result of the 'report' query
        totals, // the result of the 'totals' query
        current_date,
        report_name
      ] = fetchedQueryResults;

      // create a result object with the fetched data for each section of the report
      // can shape the result as required, e.g. using map or groupByProperty to add sections
      const shapedResult = {
        fiscal: fiscal_year,
        report,
        totals,
        current_date,
        report_name
      };

      // finally, return the shaped result
      return shapedResult;
    } catch (error) {
      console.error(`
        Model error!:
        query parameter received: ${JSON.stringify(fiscal, quarter)}
        **** ${error} ****
        returning NULL!.
      `);

      return null;
    }
  },
};
