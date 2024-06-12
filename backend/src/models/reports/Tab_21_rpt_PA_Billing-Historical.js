const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves base historical recoveries to be combined in the final query.
 *
 * @param   {string}            fiscal - Fiscal year value to filter the report.
 * @returns {Knex.QueryBuilder}        Knex query builder for fetching report data.
 */
const queries = {
  fiscal_years_to_from: (fiscalFrom, fiscalTo) => {
    return {
      fiscalFrom: fiscalFrom,
      fiscalTo: fiscalTo,
    };
  },
  recoveries: (fiscalFrom, fiscalTo) => {
    return knex("tab_21_recoverables_by_fiscal")
      .select("*")
      .whereBetween("budget_fiscal", [fiscalFrom, fiscalTo]);
  },
  fiscal_grand_totals: (fiscalFrom, fiscalTo) => {
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
      .whereBetween("budget_fiscal", [fiscalFrom, fiscalTo])
      .groupBy("fiscal_id", "budget_fiscal");
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
    const [reportFiscalYearsToFrom, reportRecoveries, reportFiscalGrandTotals] = await Promise.all([
      queries.fiscal_years_to_from(fiscalFrom, fiscalTo),
      queries.recoveries(fiscalFrom, fiscalTo),
      queries.fiscal_grand_totals(fiscalFrom, fiscalTo),
    ]);

    return {
      reportFiscalYearsToFrom,
      reportRecoveriesWithTotals: combineFiscalTotals(reportFiscalGrandTotals, reportRecoveries),
    };
  },
};
