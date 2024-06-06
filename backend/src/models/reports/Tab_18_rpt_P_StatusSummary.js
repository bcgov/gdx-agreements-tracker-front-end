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
const queries = {};

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
    const [] = await Promise.all([]);

    return {};
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
//  required can be fiscal, date, portfolio, etc.
module.exports = { required: ["project"], getAll };
