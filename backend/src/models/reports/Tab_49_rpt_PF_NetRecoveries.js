const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const required = ["fiscal"];
const utils = require("./helpers");
const _ = require("lodash");
const { groupByProperty, whereInArray } = utils;

// get the fiscal year based on the id passed from frontend

/**
 * Gets data for the Divisional Project Reports - GDX Project Net Recoveries report.
 *
 * @param           requestParams fiscal: the fiscal year for this report portfolio_id: the portfolio for this report
 * @returns {any[]}
 */

const queries = {
  getFiscalYear: (requestParams) => {
    const query = knex.select(knex.raw(`fiscal_year from data.fiscal_year`));
    if (requestParams.fiscal) {
      query.where({ "fiscal_year.id": requestParams.fiscal });
    }
  
    return query;
  },

  Tab_49_rpt_PF_NetRecoveries: (requestParams) => {
    const query = knex(`data.project_budget as pb`)
      .select({
        portfolio_id: "p.portfolio_id",
        portfolio_name: "po.portfolio_name",
        project_number: "p.project_number",
        project_name: "p.project_name",
        fiscal: "p.fiscal",
        fiscal_year: "f.fiscal_year",
      })
      .sum({
        recovered_to_date: knex.raw(
          `(
          CASE
            WHEN pb.q1_recovered THEN pb.q1_amount
            ELSE 0::money
          END +
          CASE
            WHEN pb.q2_recovered THEN pb.q2_amount
            ELSE 0::money
          END +
          CASE
            WHEN pb.q3_recovered THEN pb.q3_amount
            ELSE 0::money
          END +
          CASE
            WHEN pb.q4_recovered THEN pb.q4_amount
            ELSE 0::money
          END )`
        ),
        total_recoverable: knex.raw(
          `(
          pb.q1_amount +
          pb.q2_amount +
          pb.q3_amount +
          pb.q4_amount )`
        ),
        remaining_recoveries: knex.raw(
          `( pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount ) - (
          CASE
            WHEN pb.q1_recovered THEN pb.q1_amount
            ELSE 0::money
            END +
            CASE
              WHEN pb.q2_recovered THEN pb.q2_amount
              ELSE 0::money
            END +
            CASE
              WHEN pb.q3_recovered THEN pb.q3_amount
              ELSE 0::money
            END +
            CASE
              WHEN pb.q4_recovered THEN pb.q4_amount
              ELSE 0::money
            END )`
        ),
        less_expenses: knex.raw(
          `( 
          CASE
            WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q1_amount
            ELSE 0::money
            END
        ) +
        ( 
          CASE
            WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q2_amount
            ELSE 0::money
            END
        ) +
        ( 
          CASE
            WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q3_amount
            ELSE 0::money
            END
        ) +
        ( 
          CASE
            WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q4_amount
            ELSE 0::money
            END
        )`
        ),
        net_recoveries: knex.raw(
          `pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount - ( ( 
          CASE
            WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q1_amount
            ELSE 0::money
            END
        ) +
        ( 
          CASE
            WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q2_amount
            ELSE 0::money
            END
        ) +
        ( 
          CASE
            WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q3_amount
            ELSE 0::money
            END
        ) +
        ( 
          CASE
            WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q4_amount
            ELSE 0::money
            END
        ) )`
        ),
      })

      .leftJoin("data.project_deliverable as pd", "pb.project_deliverable_id", "pd.id")
      .leftJoin("data.project as p", "pd.project_id", "p.id")
      .leftJoin("data.fiscal_year as f", "pd.fiscal", "f.id")
      .leftJoin("data.portfolio as po", "p.portfolio_id", "po.id")

      .where("p.fiscal", requestParams.fiscal)

      .groupBy(
        "portfolio_id",
        "p.fiscal",
        "f.fiscal_year",
        "portfolio_name",
        "project_number",
        "project_name"
      )
      .modify(whereInArray, "portfolio_id", requestParams.portfolio)
      .orderBy("po.portfolio_name", "p.project_name");

    
    return query;
  },

  Tab_49_totals: (requestParams) => {
    const query = knex(`data.project_budget as pb`)
      .select({
        portfolio_name: "po.portfolio_name",
      })
      .sum({
        totals_recoveries: knex.raw(
          `(
        pb.q1_amount +
        pb.q2_amount +
        pb.q3_amount +
        pb.q4_amount )`
        ),
        totals_expenses: knex.raw(
          `( 
        CASE
          WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q1_amount
          ELSE 0::money
          END
      ) +
      ( 
        CASE
          WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q2_amount
          ELSE 0::money
          END
      ) +
      ( 
        CASE
          WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q3_amount
          ELSE 0::money
          END
      ) +
      ( 
        CASE
          WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q4_amount
          ELSE 0::money
          END
      )`
        ),
        totals_net: knex.raw(
          `pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount - ( ( 
        CASE
          WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q1_amount
          ELSE 0::money
          END
      ) +
      ( 
        CASE
          WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q2_amount
          ELSE 0::money
          END
      ) +
      ( 
        CASE
          WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q3_amount
          ELSE 0::money
          END
      ) +
      ( 
        CASE
          WHEN left( pb.stob, 2 ) IN ( '57', '65', '63', '60' ) THEN pb.q4_amount
          ELSE 0::money
          END
      ) )`
        ),
        totals_to_date: knex.raw(
          `(
        CASE
          WHEN pb.q1_recovered THEN pb.q1_amount
          ELSE 0::money
        END +
        CASE
          WHEN pb.q2_recovered THEN pb.q2_amount
          ELSE 0::money
        END +
        CASE
          WHEN pb.q3_recovered THEN pb.q3_amount
          ELSE 0::money
        END +
        CASE
          WHEN pb.q4_recovered THEN pb.q4_amount
          ELSE 0::money
        END )`
        ),
        totals_remaining: knex.raw(
          `( pb.q1_amount + pb.q2_amount + pb.q3_amount + pb.q4_amount ) - (
        CASE
          WHEN pb.q1_recovered THEN pb.q1_amount
          ELSE 0::money
          END +
          CASE
            WHEN pb.q2_recovered THEN pb.q2_amount
            ELSE 0::money
          END +
          CASE
            WHEN pb.q3_recovered THEN pb.q3_amount
            ELSE 0::money
          END +
          CASE
            WHEN pb.q4_recovered THEN pb.q4_amount
            ELSE 0::money
          END )`
        ),
      })
      .leftJoin("data.project_deliverable as pd", "pb.project_deliverable_id", "pd.id")
      .leftJoin("data.project as p", "pd.project_id", "p.id")
      .leftJoin("data.fiscal_year as f", "pd.fiscal", "f.id")
      .leftJoin("data.portfolio as po", "p.portfolio_id", "po.id")

      .where("p.fiscal", requestParams.fiscal)
      .modify(whereInArray, "portfolio_id", requestParams.portfolio)
      .groupBy("portfolio_name");

    return query;
  },
};

module.exports = {
  getAll: async (query) => {
    try {
      const { fiscal } = query;
      const [[{ fiscal_year }], report, report_totals] = await Promise.all([
        queries.getFiscalYear(fiscal),
        queries.Tab_49_rpt_PF_NetRecoveries(query),
        queries.Tab_49_totals(query),
      ]);

      const reportByPortfolio = groupByProperty(report, "portfolio_name");
      const totalsByPortfolio = _.keyBy(report_totals, "portfolio_name");
      const reportsByPortfolioWithTotals = _.map(reportByPortfolio, (portfolio) => ({
        ...portfolio,
        portfolio_totals: totalsByPortfolio[portfolio.portfolio_name],
      }));

      return {
        fiscal: fiscal_year,
        report: reportsByPortfolioWithTotals,
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
  required,
};
