const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { whereInArray } = require("./helpers");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} fiscal - The fiscal year(s) to retrieve totals for.
 * @returns {Promise}                        - A promise that resolves to the query result containing the totals for recoveries, expenses, net recoveries, and quarterly gross and net amounts.
 */
const queries = {
  projByPort: (portfolio) => {
    return knex
      .select(
        "pf.portfolio_name as portfolio",
        "pf.portfolio_abbrev",
        "pr.fiscal",
        "m.ministry_short_name as ministry",
        "pr.project_number as #",
        "pr.project_name as name",
        { project_manager: knex.raw("c.last_name || ', ' || c.first_name") },
        "pr.description",
        "pr.planned_start_date as start_date",
        "pr.planned_end_date as end_date",
        "pr.planned_budget",
        "pr.project_type",
        "pr.project_status"
      )
      .from("data.project as pr")
      .rightJoin("data.portfolio as pf", "pf.id", "pr.portfolio_id")
      .rightJoin("data.contact as c", "c.id", "pr.project_manager")
      .innerJoin("data.ministry as m", "pr.ministry_id", "m.id")
      .modify(whereInArray, "pf.id", portfolio)
      .where("pr.project_status", "Active")
      .orderBy("pf.portfolio_name")
      .orderBy("pr.fiscal", "desc")
      .orderBy("pr.project_number", "desc");
  },
  portfolios: (portfolio) => {
    return knex
      .select("pf.portfolio_name as portfolio")
      .from("data.project as pr")
      .rightJoin("data.portfolio as pf", "pf.id", "pr.portfolio_id")
      .modify(whereInArray, "pf.id", portfolio)
      .where("pr.project_status", "Active")
      .groupBy("pf.portfolio_name")
      .orderBy("pf.portfolio_name");
  },
  portfolioTotals: (portfolio) => {
    return knex
      .select("portfolio")
      .sum("planned_budget")
      .groupBy("portfolio")
      .from(queries.projByPort(portfolio).as("sub"));
  },
  totals: (portfolio) => {
    return knex.sum("planned_budget").from(queries.projByPort(portfolio).as("sub")).first();
  },
};

module.exports = {
  required: ["portfolio"],
  getAll: async (query) => {
    try {
      const { portfolio } = query;
      const [reportProjByPort, reportPortfolios, reportPortfolioTotals, reportTotals] =
        await Promise.all([
          queries.projByPort(portfolio),
          queries.portfolios(portfolio),
          queries.portfolioTotals(portfolio),
          queries.totals(portfolio),
        ]);

      const combinePortfolios = (portfolios, reportSection, reportPortfolioTotals) => {
        const projectsWithPortfolios = [];

        portfolios.forEach((portfolio) => {
          const sectionItems = reportSection.filter((section) => {
            return section.portfolio_name === portfolio.portfolio_name;
          });

          const sectionTotal = reportPortfolioTotals.reduce((acc, section) => {
            if (section.portfolio === portfolio.portfolio) {
              return section;
            }
            return acc;
          });

          projectsWithPortfolios.push({
            sectionInfo: sectionItems,
            sectionPortfolio: portfolio,
            sectionTotal: sectionTotal,
          });
        });

        return projectsWithPortfolios;
      };

      return {
        reportProjByPort: combinePortfolios(
          reportPortfolios,
          reportProjByPort,
          reportPortfolioTotals
        ),
        reportTotals,
      };
    } catch (error) {
      console.error(`
        Model error!:
        query parameter received: ${JSON.stringify(query)}
        **** ${error} ****
        returning NULL!.
      `);

      return null;
    }
  },
};
