// Libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);
const { whereInArray } = require("./helpers");

const queries = {
  lessonsLearned: (projectId, portfolio, fiscal) => {
    return knex
      .select(
        "lc.lesson_category_name",
        "p.project_number",
        "p.project_name",
        "p.id as project_id",
        "p.fiscal",
        "pl.lesson",
        "pl.recommendations",
        "pl.lesson_sub_category",
        "po.portfolio_abbrev",
        "po.portfolio_name",
        "p.id"
      )
      .from("portfolio as po")
      .innerJoin("project as p", "po.id", "p.portfolio_id")
      .innerJoin("project_lesson as pl", "p.id", "pl.project_id")
      .innerJoin("lesson_category as lc", "lc.id", "pl.lesson_category_id")
      .modify(whereInArray, "po.id", portfolio)
      .modify(whereInArray, "p.id", projectId)
      .modify(whereInArray, "p.fiscal", fiscal)
      .groupBy(
        "lc.lesson_category_name",
        "p.project_number",
        "p.project_name",
        "p.id",
        "p.fiscal",
        "pl.lesson",
        "pl.recommendations",
        "pl.lesson_sub_category",
        "po.portfolio_abbrev",
        "po.portfolio_name",
        "p.id"
      )
      .then((rows) => {
        const result = [];

        rows.forEach((row) => {
          const category = row.lesson_category_name;
          const info = {
            project_number: row.project_number,
            project_name: row.project_name,
            project_id: row.project_id,
            fiscal: row.fiscal,
            lesson: row.lesson,
            recommendations: row.recommendations,
            lesson_sub_category: row.lesson_sub_category,
            portfolio_abbrev: row.portfolio_abbrev,
            portfolio_name: row.portfolio_name,
          };

          const existingCategory = result.find((item) => item.category === category);
          if (existingCategory) {
            existingCategory.info.push(info);
          } else {
            result.push({ category, info: [info] });
          }
        });

        return result;
      });
  },
  portfolio: (portfolio) => {
    return knex
      .select("po.portfolio_name")
      .from("portfolio as po")
      .modify(whereInArray, "po.id", portfolio)
      .pluck("po.portfolio_name")
      .then((portfolioNames) => {
        const jsonString = JSON.stringify(portfolioNames);
        return { portfolioNames: jsonString.replace(/[[\]""]/g, "") };
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
 * @param            options.portfolio  - The portfolio to retrieve data for.
 * @returns {object}                    - An object containing fiscal year, report, and report total.
 */
// add other parameters if needed, like quarter, portfolio, date etc.
const getAll = async ({ project, portfolio, fiscal }) => {
  const projectId = Number(project);
  try {
    const [reportLessonsLearned, reportPortfolio] = await Promise.all([
      queries.lessonsLearned(projectId, portfolio, fiscal),
      queries.portfolio(portfolio),
    ]);

    return { reportLessonsLearned, reportPortfolio };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
//  required can be fiscal, date, portfolio, etc.
module.exports = { required: [], getAll };
