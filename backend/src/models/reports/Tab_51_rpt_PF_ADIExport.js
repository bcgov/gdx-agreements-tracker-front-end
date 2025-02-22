// Libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

// query body template
const subquery = `
WITH project_budget_normalized
     AS (SELECT id,
                project_deliverable_id,
                fiscal,
                client_coding_id,
                contract_id,
                notes,
                detail_amount,
                recovery_area,
                resource_type,
                stob,
                1            QUARTER,
                q1_recovered recovered,
                q1_amount    amount
         FROM   data.project_budget prb
         UNION ALL
         SELECT id,
                project_deliverable_id,
                fiscal,
                client_coding_id,
                contract_id,
                notes,
                detail_amount,
                recovery_area,
                resource_type,
                stob,
                2            QUARTER,
                q2_recovered recovered,
                q2_amount    amount
         FROM   data.project_budget prb
         UNION ALL
         SELECT id,
                project_deliverable_id,
                fiscal,
                client_coding_id,
                contract_id,
                notes,
                detail_amount,
                recovery_area,
                resource_type,
                stob,
                3            QUARTER,
                q3_recovered recovered,
                q3_amount    amount
         FROM   data.project_budget prb
         UNION ALL
         SELECT id,
                project_deliverable_id,
                fiscal,
                client_coding_id,
                contract_id,
                notes,
                detail_amount,
                recovery_area,
                resource_type,
                stob,
                4            QUARTER,
                q4_recovered recovered,
                q4_amount    amount
         FROM   data.project_budget prb)
SELECT p.grp,
       cc.client,
       cc.responsibility_centre,
       cc.expense_authority_name,
       p.id                           project_id,
       pb.fiscal,
       fy.fiscal_year,
       pb.quarter,
       pb.recovery_area,
       po.portfolio_abbrev            portfolio,
       To_char(DATE ('20'
                     || LEFT(fy.fiscal_year, 2)
                     || '0401') + ( pb.quarter - 1
                                    || ' months' ) :: interval - ( 1
                                                                   || 'day' ) ::
               interval, 'DD-Mon-YY') AS "accounting_date",
       'GDXProjectBilling_'
       || fy.fiscal_year
       || '_'
       || CAST(pb.quarter AS TEXT)    "journal_desc",
       CASE
         WHEN p.grp IS NULL THEN cc.expense_authority_name
         ELSE po.expense_authority
       END                            expense_authority_name,
       CASE
         WHEN p.grp IS NULL THEN cc.client
         ELSE po.client
       END                            cl,
       CASE
         WHEN p.grp IS NULL THEN cc.responsibility_centre
         ELSE po.responsibility
       END                            rsp,
       CASE
         WHEN p.grp IS NULL THEN cc.service_line
         ELSE po.service_line
       END                            srvc,
       CASE
         WHEN p.grp IS NULL THEN cc.stob
         ELSE pb.stob
       END                            stob,
       CASE
         WHEN p.grp IS NULL THEN cc.project_code
         ELSE po.cas_project_code
       END                            proj,
       '000000'                       loc,
       '0000'                         fut,
       CASE
         WHEN p.grp IS NULL THEN Sum(amount)
         ELSE NULL
       END                            debit,
       CASE
         WHEN p.grp IS NOT NULL THEN Sum(amount)
         ELSE NULL
       END                            credit,
       'Q'
       || CAST(pb.quarter AS TEXT)
       || ' '
       || p.project_number
       || ' '
       || p.project_name              "line_desc"
FROM   project_budget_normalized pb
       INNER JOIN data.project_deliverable pd
               ON pb.project_deliverable_id = pd.id
       INNER JOIN data.fiscal_year fy
               ON pb.fiscal = fy.id
       INNER JOIN data.portfolio po
               ON pb.recovery_area = po.id
       INNER JOIN data.client_coding cc
               ON pb.client_coding_id = cc.id
       INNER JOIN (SELECT *,
                          id grp
                   FROM   data.project) p
               ON cc.project_id = p.id
WHERE  pb.recovered = true
GROUP  BY grouping sets ( ( pb.fiscal, fy.fiscal_year, pb.quarter,
                            pb.recovery_area,
              po.portfolio_abbrev, po.expense_authority, cc.client,
                                        cc.responsibility_centre,
              cc.service_line, cc.stob, cc.project_code, po.client,
              po.responsibility, po.service_line, pb.stob, po.cas_project_code,
              p.project_number, p.project_name, p.id, p.grp ), (
            pb.fiscal, fy.fiscal_year, pb.quarter, pb.recovery_area,
            po.portfolio_abbrev, po.expense_authority, cc.client,
            cc.responsibility_centre,
            cc.service_line, cc.stob, cc.project_code, p.project_number,
            p.project_name, p.id, cc.expense_authority_name ) )
ORDER  BY fy.fiscal_year,
          pb.quarter,
          po.portfolio_abbrev,
          p.project_number,
          CASE
            WHEN p.grp IS NULL THEN 0
            ELSE 1
          END 
`;

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} Parameter- The fiscal, Date, or Portfolio(s) to grab data for
 * @returns {Promise}                            - A promise that resolves to the query result
 */
const queries = {
  fiscal: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  report: (fiscal, quarter, project_id) =>
    knex
      .select("*")
      .fromRaw(`(${subquery}) as q`)
      .where({ "q.fiscal": fiscal, "q.quarter": quarter, "q.project_id": project_id }),
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
const getAll = async ({ fiscal, quarter, fiscal_year_id, project_id, project }) => {
  try {
    // Await all promises in parallel
    const fiscalValue = fiscal ? fiscal : fiscal_year_id;
    const projectValue = project ? project : project_id;
    const [{ fiscal_year }, report] = await Promise.all([
      queries.fiscal(fiscalValue),
      queries.report(fiscalValue, quarter, projectValue),
    ]);

    return { fiscal_year, report };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
//  required can be fiscal, date, portfolio, etc.
module.exports = { required: ["quarter", "fiscal_year_id", "fiscal_year"], getAll };
