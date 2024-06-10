// Libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);
const { getCurrentDate } = require("@controllers/reports/helpers");

const queries = {
  reportProjectStatus: (projectId) => {
    return knex("data.project as p")
      .select(
        "ps.status_date",
        knex.raw("CONCAT(cps.first_name, ' ', cps.last_name) AS reported_by"),
        "pp.phase_name",
        knex.raw(
          "CONCAT(hi.colour_red, ',', hi.colour_green, ',', hi.colour_blue) AS colour_health"
        ),
        knex.raw(
          "CONCAT(his.colour_red, ',', his.colour_green, ',', his.colour_blue) AS colour_schedule"
        ),
        knex.raw(
          "CONCAT(hib.colour_red, ',', hib.colour_green, ',', hib.colour_blue) AS colour_budget"
        ),
        knex.raw(
          "CONCAT(hit.colour_red, ',', hit.colour_green, ',', hit.colour_blue) AS colour_team"
        ),
        "ps.general_progress_comments",
        "ps.issues_and_decisions",
        "ps.forecast_and_next_steps",
        "ps.identified_risk"
      )
      .leftJoin("data.project_status as ps", "p.id", "ps.project_id")
      .leftJoin("data.contact as cps", "ps.reported_by_contact_id", "cps.id")
      .leftJoin("data.health_indicator as hi", "ps.health_id", "hi.id")
      .leftJoin("data.health_indicator as his", "ps.schedule_health_id", "his.id")
      .leftJoin("data.health_indicator as hib", "ps.budget_health_id", "hib.id")
      .leftJoin("data.health_indicator as hit", "ps.team_health_id", "hit.id")
      .leftJoin("data.project_phase as pp", "ps.project_phase_id", "pp.id")
      .leftJoin("data.contact as c", "p.project_manager", "c.id")
      .leftJoin("data.contact as c1", "p.completed_by_contact_id", "c1.id")
      .where("p.id", projectId);
  },
  reportProject: (projectId) => {
    return knex
      .select(
        "p.project_number",
        "p.project_name",
        "po.portfolio_name",
        "p.total_project_budget",
        knex.raw(
          `MAX(CASE WHEN cr.role_type='GDXSponsor' THEN c.first_name || ' ' || c.last_name ELSE NULL END) AS sid_sponsor`
        ),
        knex.raw(
          `MAX(CASE WHEN cr.role_type='GDXContact' THEN c.first_name || ' ' || c.last_name ELSE NULL END) AS sid_contact`
        ),
        knex.raw(
          `MAX(CASE WHEN cr.role_type='ClientSponsor' THEN c.first_name || ' ' || c.last_name ELSE NULL END) AS client_sponsor`
        ),
        knex.raw(
          `MAX(CASE WHEN cr.role_type='ClientContact' THEN c.first_name || ' ' || c.last_name ELSE NULL END) AS client_contact`
        ),
        knex.raw(
          `MAX(CASE WHEN cr.role_type='CommsLead' THEN c.first_name || ' ' || c.last_name ELSE NULL END) AS comms_lead`
        ),
        knex.raw(`COALESCE(p.agreement_start_date, p.planned_start_date) AS start_date`),
        knex.raw(`COALESCE(p.agreement_end_date, p.planned_end_date) AS end_date`),
        "m.ministry_name",
        "p.description",
        "p.project_goals",
        "pm.project_manager"
      )
      .from("data.portfolio as po")
      .innerJoin("data.project as p", "po.id", "p.portfolio_id")
      .leftJoin("data.ministry as m", "p.ministry_id", "m.id") // Fix: changed "" to 'm.id'
      .leftJoin("data.contact_project as cp", "cp.project_id", "p.id")
      .leftJoin("data.contact_role as cr", "cr.id", "cp.contact_role")
      .leftJoin("data.contact as c", "c.id", "cp.contact_id")
      .leftJoin(
        knex
          .select("id", knex.raw(`CONCAT(first_name, ' ', last_name) AS project_manager`))
          .from("data.contact")
          .as("pm"),
        "pm.id",
        "p.project_manager"
      )
      .where("p.id", projectId)
      .groupBy(
        "p.project_number",
        "p.project_name",
        "po.portfolio_name",
        "p.total_project_budget",
        "m.ministry_name", // Fix: added 'm.' prefix
        "p.description",
        "p.project_goals",
        "pm.project_manager",
        "p.agreement_start_date",
        "p.agreement_end_date",
        "p.planned_start_date",
        "p.planned_end_date"
      )
      .first();
  },
  reportDeliverables: (projectId) => {
    return knex
      .select(
        "pd.deliverable_name",
        "pd.start_date",
        "pd.completion_date",
        "pd.deliverable_amount",
        "pd.percent_complete",
        "pd.deliverable_status"
      )
      .from("data.project as p")
      .innerJoin("data.project_deliverable as pd", "pd.project_id", "p.id")
      .where("p.id", projectId)
      .andWhere(function () {
        this.orWhere("pd.is_expense", "=", false).orWhereNull("pd.is_expense");
      });
  },
  reportProjectCloseout: (projectId) => {
    return knex("project as p")
      .select(
        "p.close_out_date",
        knex.raw("concat(c.first_name, ' ', c.last_name) as completed_by"),
        "p.actual_completion_date",
        "p.hand_off_to_operations",
        "p.records_filed",
        "p.contract_ev_completed",
        "p.contractor_security_terminated",
        "pl.lesson"
      )
      .leftJoin("contact as c", "p.completed_by_contact_id", "c.id")
      .leftJoin("project_lesson as pl", "pl.project_id", projectId)
      .where("p.id", projectId);
  },
  reportStrategicAlignment: (projectId) => {
    return knex
      .select("project_id", "description", "short_description")
      .from("data.strategic_alignment as sa")
      .innerJoin("data.project_strategic_alignment as psa", "sa.id", "psa.strategic_alignment_id")
      .where("psa.checked", true)
      .where("psa.project_id", projectId);
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
      reportProjectStatus,
      reportProject,
      reportCurrentDate,
      reportDeliverables,
      reportProjectCloseout,
      reportStrategicAlignment,
    ] = await Promise.all([
      queries.reportProjectStatus(projectId),
      queries.reportProject(projectId),
      getCurrentDate(),
      queries.reportDeliverables(projectId),
      queries.reportProjectCloseout(projectId),
      queries.reportStrategicAlignment(projectId),
    ]);

    return {
      reportProjectStatus,
      reportProject,
      reportCurrentDate,
      reportDeliverables,
      reportProjectCloseout,
      reportStrategicAlignment,
    };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

// Export the functions to be used in controller.
//  required can be fiscal, date, portfolio, etc.
module.exports = { required: ["project"], getAll };
