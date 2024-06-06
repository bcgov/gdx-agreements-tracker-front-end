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
  reportDeliverables: (projectId) => {
    return knex(`data.tab_14_project_budget_deliverables_view as p`)
      .select("*")
      .where({ "p.project_id": projectId });
  },
  reportDeliverablesTotalsByFiscal: (projectId) => {
    return knex(`data.tab_14_project_budget_deliverables_view as p`)
      .select(
        "p.fiscal_year",
        knex.raw("SUM(p.current_budget) AS total_cb"),
        knex.raw("SUM(p.recovery_amount) AS total_ra"),
        knex.raw("SUM(p.recovered_to_date) AS total_rtd"),
        knex.raw("SUM(p.balance_remaining) AS total_br")
      )
      .where({ "p.project_id": projectId })
      .groupBy("p.fiscal_year");
  },
  reportDeliverablesGrandTotals: (projectId) => {
    return knex(`data.tab_14_project_budget_deliverables_view as p`)
      .select(
        knex.raw("SUM(p.current_budget) AS grand_total_cb"),
        knex.raw("SUM(p.recovery_amount) AS grand_total_ra"),
        knex.raw("SUM(p.recovered_to_date) AS grand_total_rtd"),
        knex.raw("SUM(p.balance_remaining) AS grand_total_br")
      )
      .where("p.project_id", projectId)
      .first();
  },
  reportProjectInfo: (projectId) => {
    return knex("data.project AS p")
      .select(
        "p.project_number AS project_number",
        "p.project_name AS project_name",
        knex.raw("CONCAT(c.first_name, '_', c.last_name) AS project_manager"),
        "m.ministry_name AS ministry_name",
        "p.funding AS project_funding",
        "p.agreement_start_date AS agreement_start_date",
        "p.agreement_end_date AS agreement_end_date",
        "p.recoverable AS recovery_status",
        "p.description AS project_description"
      )
      .innerJoin("data.ministry AS m", "p.ministry_id", "m.id")
      .innerJoin("data.contact AS c", "p.project_manager", "c.id")
      .where({ "p.id": projectId })
      .groupBy(
        "p.project_number",
        "p.project_name",
        "m.ministry_name",
        "p.description",
        "p.recoverable",
        "p.funding",
        "p.agreement_start_date",
        "p.agreement_end_date",
        knex.raw("CONCAT(c.first_name, '_', c.last_name)")
      )
      .first();
  },
  reportChangeRequest: (projectId) => {
    return knex(`${changeRequestTable} as cr`)
      .select({
        version: "cr.version",
        initiated_by: "cr.initiated_by",
        initiation_date: knex.raw(`TO_CHAR(cr.initiation_date :: DATE, '${dateFormatShortYear}')`),
        summary: "cr.summary",
        type: knex.raw(`string_agg(crt.crtype_name, ', ')`),
      })
      .leftJoin(`${changeRequestTypeLookupTable} as crtl`, { "crtl.change_request_id": "cr.id" })
      .leftJoin(`${changeRequestTypeTable} as crt`, { "crtl.crtype_id": "crt.id" })
      .groupBy("cr.id")
      .where({ "cr.link_id": projectId })
      .orderBy("cr.version");
  },
  reportContractInfo: (projectId) => {
    return knex(`data.tab_14_project_budget_contract_info`)
      .select("*")
      .where("project_id", projectId)
      .orderBy("co_number", "asc");
  },
  reportContractInfoTotalsByFiscal: (projectId) => {
    return knex(`data.tab_14_project_budget_contract_info as p`)
      .select(
        "p.fiscal_year",
        knex.raw("SUM(p.total_CONTRACT_AMOUNT) AS total_ca"),
        knex.raw("SUM(p.INVOICED_TO_DATE) AS total_itd"),
        knex.raw("SUM(p.BALANCE_REMAINING) AS total_br"),
        knex.raw("SUM(p.DESCOPED) AS total_ds")
      )
      .where("p.project_id", projectId)
      .groupBy("p.fiscal_year");
  },
  reportContractInfoGrandTotals: (projectId) => {
    return knex(`data.tab_14_project_budget_contract_info as p`)
      .select(
        knex.raw("SUM(p.total_CONTRACT_AMOUNT) AS grand_total_ca"),
        knex.raw("SUM(p.INVOICED_TO_DATE) AS grand_total_itd"),
        knex.raw("SUM(p.BALANCE_REMAINING) AS grand_total_br"),
        knex.raw("SUM(p.DESCOPED) AS grand_total_ds")
      )
      .where("p.project_id", projectId)
      .first();
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
    const [
      reportDeliverables,
      reportDeliverablesTotalsByFiscal,
      reportDeliverablesGrandTotals,
      reportProjectInfo,
      reportStatus,
      reportCurrentDate,
      reportChangeRequest,
      reportContractInfo,
      reportContractInfoTotalsByFiscal,
      reportContractInfoGrandTotals,
    ] = await Promise.all([
      queries.reportDeliverables(projectId),
      queries.reportDeliverablesTotalsByFiscal(projectId),
      queries.reportDeliverablesGrandTotals(projectId),
      queries.reportProjectInfo(projectId),
      findMostRecentStatusById(projectId),
      getCurrentDate(),
      queries.reportChangeRequest(projectId),
      queries.reportContractInfo(projectId),
      queries.reportContractInfoTotalsByFiscal(projectId),
      queries.reportContractInfoGrandTotals(projectId),
    ]);

    const combineFiscalTotals = (totalsByFiscal, reportSection) => {
      const withTotals = [];

      totalsByFiscal.forEach((fiscalTotal) => {
        const fiscalYear = fiscalTotal.fiscal_year;
        const sectionItems = reportSection.filter((section) => section.fiscal_year === fiscalYear);

        withTotals.push({
          sectionInfo: sectionItems,
          sectionTotals: fiscalTotal,
        });
      });

      return withTotals;
    };

    return {
      reportDeliverableWithTotals: combineFiscalTotals(
        reportDeliverablesTotalsByFiscal,
        reportDeliverables
      ),
      reportDeliverablesGrandTotals,
      reportProjectInfo,
      reportStatus,
      reportCurrentDate,
      reportChangeRequest,
      reportContractWithTotals: combineFiscalTotals(
        reportContractInfoTotalsByFiscal,
        reportContractInfo
      ),
      reportContractInfoGrandTotals,
    };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
//  required can be fiscal, date, portfolio, etc.
module.exports = { required: ["project"], getAll };
