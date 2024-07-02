const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves base historical recoveries to be combined in the final query.
 *
 * @param   {string}            fiscal - Fiscal year value to filter the report.
 * @returns {Knex.QueryBuilder}        Knex query builder for fetching report data.
 */
const queries = {
  recoveries: (fiscalFrom, fiscalTo) => { // recoveries by project
    return knex('data.historical_projects as hp')
  .select([
    'hp.project_number',
    'hp.project_name',
    'hp.total_project_budget',
    knex.raw('fy.fiscal_year AS BudgetFiscal'),
    'hpb.q1',
    'hpb.q2',
    'hpb.q3',
    'hpb.q4',
    knex.raw('COALESCE(hpb.Q1, 0::money) + COALESCE(hpb.Q2, 0::money) + COALESCE(hpb.Q3, 0::money) + COALESCE(hpb.Q4, 0::money) AS total_recovered')
  ])
  .innerJoin('data.historical_project_billing as hpb', 'hp.project_number', 'hpb.project_number')
  .innerJoin('data.fiscal_year as fy', 'hpb.fiscal_year', 'fy.id')
  .groupBy([
    'hp.project_number',
    'hp.project_name',
    'hp.total_project_budget',
    'fy.fiscal_year',
    'hpb.q1',
    'hpb.q2',
    'hpb.q3',
    'hpb.q4'
  ]);
  },

  fiscalGrandTotals: (fiscalFrom, fiscalTo) => {
    return knex
      .select(
        knex.raw("SUM(total_recovered) as recovered_total"),
        knex.raw("SUM(q1) as q1"),
        knex.raw("SUM(q2) as q2"),
        knex.raw("SUM(q3) as q3"),
        knex.raw("SUM(q4) as q4"),
        "budgetfiscal"
      )
      .from(queries.recoveries(fiscalFrom, fiscalTo).as('tab_21_recoverables'))
      .where("tab_21_recoverables.budgetfiscal", ">=", fiscalFrom)
      .andWhere("tab_21_recoverables.budgetfiscal", "<=", fiscalTo)
      .groupBy("tab_21_recoverables.budgetfiscal");
  },


  multiFiscalGrandTotals: (fiscalFrom, fiscalTo) => {
    return knex(queries.recoveries(fiscalFrom, fiscalTo).as('tab_21_recoverables'))
      .sum("q1 as q1")
      .sum("q2 as q2")
      .sum("q3 as q3")
      .sum("q4 as q4")
      .sum("total_recovered as total_recovered")
      .where("budgetfiscal", ">=", fiscalFrom)
      .andWhere("budgetfiscal", "<=", fiscalTo)
      .first();
  },
};

const combineFiscalTotals = (totalsByFiscal, reportSection) => {
  const withTotals = [];

  totalsByFiscal.forEach((fiscalTotal) => {
    const fiscalYear = fiscalTotal.budgetfiscal;
    const sectionItems = reportSection.filter((section) => section.budgetfiscal === fiscalYear);

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
