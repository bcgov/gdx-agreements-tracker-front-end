const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves base historical recoveries to be combined in the final query.
 *
 * @param   {string}            fiscal - Fiscal year value to filter the report.
 * @returns {Knex.QueryBuilder}        Knex query builder for fetching report data.
 */
const queries = {
  recoveries: (fiscalFrom, fiscalTo) => {
    return knex("tab_21_recoverables_by_fiscal")
      .select("*")
      .where("budget_fiscal", ">=", fiscalFrom)
      .andWhere("budget_fiscal", "<=", fiscalTo);
  },
  fiscalGrandTotals: (fiscalFrom, fiscalTo) => {
    return knex
      .select(
        knex.raw("SUM(total_recovered) as recovered_total"),
        knex.raw("SUM(q1) as q1"),
        knex.raw("SUM(q2) as q2"),
        knex.raw("SUM(q3) as q3"),
        knex.raw("SUM(q4) as q4"),
        "budget_fiscal"
      )
      .from("data.tab_21_recoverables_by_fiscal")
      .where("budget_fiscal", ">=", fiscalFrom)
      .andWhere("budget_fiscal", "<=", fiscalTo)
      .groupBy("fiscal_id", "budget_fiscal");
  },
  multiFiscalGrandTotals: (fiscalFrom, fiscalTo) => {
    return knex("tab_21_recoverables_by_fiscal")
      .sum("q1 as q1")
      .sum("q2 as q2")
      .sum("q3 as q3")
      .sum("q4 as q4")
      .sum("total_recovered as total_recovered")
      .where("budget_fiscal", ">=", fiscalFrom)
      .andWhere("budget_fiscal", "<=", fiscalTo)
      .first();
  },
};

const combineFiscalTotals = (totalsByFiscal, reportSection) => {
  const withTotals = [];

  totalsByFiscal.forEach((fiscalTotal) => {
    const fiscalYear = fiscalTotal.budget_fiscal;
    const sectionItems = reportSection.filter((section) => section.budget_fiscal === fiscalYear);

    withTotals.push({
      sectionInfo: sectionItems,
      sectionTotals: fiscalTotal,
      sectionFiscal: fiscalYear,
    });
  });

  return withTotals;
};

module.exports = {
  required: ["fiscalFrom", "fiscalTo"],
  getAll: async ({ fiscalFrom, fiscalTo }) => {
    const [reportRecoveries, reportFiscalGrandTotals, reportMultiFiscalGrandTotals] =
      await Promise.all([
        queries.recoveries(fiscalFrom, fiscalTo),
        queries.fiscalGrandTotals(fiscalFrom, fiscalTo),
        queries.multiFiscalGrandTotals(fiscalFrom, fiscalTo),
      ]);

    return {
      reportRecoveriesWithTotals: combineFiscalTotals(reportFiscalGrandTotals, reportRecoveries),
      reportMultiFiscalGrandTotals,
      fiscalFrom,
      fiscalTo,
    };
  },
};
