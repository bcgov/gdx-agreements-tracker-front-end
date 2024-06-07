// Libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);
const { getCurrentDate } = require("@controllers/reports/helpers");
const { findMostRecentStatusById } = require("@models/projects");
const {
  changeRequestTable,
  changeRequestTypeLookupTable,
  changeRequestTypeTable,
} = require("@models/useDbTables");

const { dateFormatShortYear } = require("@helpers/standards");
const queries = {
  reportProjectInfo: (projectId) => {
    return knex
      .select(
        "ps.status_date",
        knex.raw('CONCAT(cps.first_name, " ", cps.last_name) AS reported_by'),
        "pp.phase_name",
        knex.raw(
          'CONCAT(hi.colour_red, ",", hi.colour_green, ",", hi.colour_blue) AS colour_health'
        ),
        knex.raw(
          'CONCAT(his.colour_red, ",", his.colour_green, ",", his.colour_blue) AS colour_schedule'
        ),
        knex.raw(
          'CONCAT(hib.colour_red, ",", hib.colour_green, ",", hib.colour_blue) AS colour_budget'
        ),
        knex.raw(
          'CONCAT(hit.colour_red, ",", hit.colour_green, ",", hit.colour_blue) AS colour_team'
        ),
        "ps.general_progress_comments",
        "ps.issues_and_decisions",
        "ps.forecast_and_next_steps",
        "ps.identified_risk"
      )
      .from("data.project as p")
      .leftJoin("data.project_status as ps", "p.id", "ps.project_id")
      .leftJoin("data.contact as cps", "ps.reported_by_contact_id", "cps.id")
      .leftJoin("data.health_indicator as hi", "ps.health_id", "hi.id")
      .leftJoin("data.health_indicator as his", "ps.schedule_health_id", "his.id")
      .leftJoin("data.health_indicator as hib", "ps.budget_health_id", "hib.id")
      .leftJoin("data.health_indicator as hit", "ps.team_health_id", "hit.id")
      .leftJoin("data.project_phase as pp", "ps.project_phase_id", "pp.id")
      .leftJoin("data.contact as c", "p.project_manager", "c.id")
      .leftJoin("data.contact as c1", "p.completed_by_contact_id", "c1.id")
      .where("p.project_number", projectId)
      .then((rows) => {
        console.log(rows);
      })
      .catch((err) => {
        console.error(err);
      });
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
    const [reportProjectInfo] = await Promise.all([queries.reportProjectInfo(projectId)]);

    return { reportProjectInfo };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
//  required can be fiscal, date, portfolio, etc.
module.exports = { required: ["project"], getAll };
