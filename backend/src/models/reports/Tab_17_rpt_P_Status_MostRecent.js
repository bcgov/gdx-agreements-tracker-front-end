// Libs
const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const log = require("../../facilities/logging")(module.filename);

// Constants
const { dateFormatShortYear } = require("@helpers/standards");

// Utilities
const getFormattedDate = (date) => knex.raw(`TO_CHAR(${date}, '${dateFormatShortYear}')`);

// Queries for the report sections needed by the controller
const queries = {
  // Headers for the report.
  project: (project_id) =>
    knex(`data.projects_with_json as p`)
      .select({
        current_date: getFormattedDate("NOW()"),
        project_name: knex.raw(`CONCAT(p.project_number, ': ', p.project_name)`),
        project_manager: knex.raw(`CONCAT(c.first_name, ' ', c.last_name)`),
        portfolio_label: knex.raw("p.portfolio_id::json ->> 'label'"), // Extracted portfolio label
        budget: "p.total_project_budget",
        gdx_executive: "gdx_exec.name",
        start_date: getFormattedDate("p.agreement_start_date"),
        end_date: getFormattedDate("p.agreement_end_date"),
        client_executive: "client_exec.name",
        ministry_label: knex.raw("p.ministry_id::json ->> 'label'"), // Extracted ministry Label.
        description: "p.description",
        goals: "p.project_goals",
        strategic_alignment: knex.raw(`
        (SELECT sa.description
         FROM data.project_strategic_alignment psa
         JOIN data.strategic_alignment sa ON psa.strategic_alignment_id = sa.id
         WHERE psa.project_id = p.id AND psa.checked = true
         LIMIT 1)
      `),
      })
      .leftJoin(`data.contact as c`, "p.project_manager", "c.id")
      .leftJoin(
        function () {
          this.select("cp.project_id", knex.raw(`CONCAT(c.first_name, ' ' , c.last_name) as name`))
            .from(`data.contact_project as cp`)
            .join(`data.contact as c`, "cp.contact_id", "c.id")
            .where("cp.contact_role", 4) // GDX Executive Sponsor role is 4.
            .andWhere("cp.project_id", project_id)
            .as("gdx_exec");
        },
        "p.id",
        "gdx_exec.project_id"
      )
      .leftJoin(
        function () {
          this.select("cp.project_id", knex.raw(`CONCAT(c.first_name, ' ' ,c.last_name) as name`))
            .from(`data.contact_project as cp`)
            .join("contact as c", "cp.contact_id", "c.id")
            .where("cp.contact_role", 1) // Client sponsor role is 1.
            .andWhere("cp.project_id", project_id)
            .as("client_exec");
        },
        "p.id",
        "client_exec.project_id"
      )
      .where("p.id", project_id)
      .first(),

  // Project status (Only gets the latest project status)
  status: (project_id) =>
    knex("data.project_status as ps")
      .select([
        knex.raw(`TO_CHAR(ps.status_date, 'dd-Mon-yy') AS status_date`),
        knex.raw(`CONCAT(reported_by.first_name, ' ', reported_by.last_name) AS reported_by`),
        "phase.phase_name AS project_phase",
        "health.health_name AS project_health",
        "team.health_name AS team_health",
        "budget.health_name AS budget_health",
        "schedule.health_name AS schedule_health",
        knex.raw(`
            CASE
              WHEN health.health_name IS NOT NULL THEN
                CONCAT(health.colour_red, ',', health.colour_green, ',', health.colour_blue)
              ELSE NULL
            END AS colour_project
          `),
        knex.raw(`
                CASE
                  WHEN team.health_name IS NOT NULL THEN
                    CONCAT(team.colour_red, ',', team.colour_green, ',', team.colour_blue)
                  ELSE NULL
                END AS colour_team
              `),
        knex.raw(`
                CASE
                  WHEN budget.health_name IS NOT NULL THEN
                    CONCAT(budget.colour_red, ',', budget.colour_green, ',', budget.colour_blue)
                  ELSE NULL
                END AS colour_budget
              `),
        knex.raw(`
                CASE
                  WHEN schedule.health_name IS NOT NULL THEN
                    CONCAT(schedule.colour_red, ',', schedule.colour_green, ',', schedule.colour_blue)
                  ELSE NULL
                END AS colour_schedule
              `),
        "ps.general_progress_comments AS general_progress_comments",
        "ps.issues_and_decisions AS issues_and_decisions",
        "ps.forecast_and_next_steps AS forecast_and_next_steps",
        "ps.identified_risk AS identified_risk",
      ])
      .join("data.project_phase as phase", "ps.project_phase_id", "phase.id")
      .join("data.health_indicator as health", "ps.health_id", "health.id")
      .join("data.health_indicator as schedule", "ps.schedule_health_id", "schedule.id")
      .join("data.health_indicator as budget", "ps.budget_health_id", "budget.id")
      .join("data.health_indicator as team", "ps.team_health_id", "team.id")
      .join("data.contact as reported_by", "ps.reported_by_contact_id", "reported_by.id")
      .where("ps.project_id", project_id)
      .orderBy("ps.status_date", "desc")
      .first(),

  // All deliverables for this project's status and completion
  deliverables: (project_id) =>
    knex
      .select(
        "pd.id",
        "p.id as project_id",
        knex.raw(
          "CASE WHEN pd.id IS NULL THEN 'No Deliverables' ELSE pd.deliverable_name END as deliverable_name"
        ),
        { start_date: getFormattedDate("pd.start_date") },
        { completion_date: getFormattedDate("pd.completion_date") },
        "pd.deliverable_amount",
        { percent_complete: knex.raw("?? * 100", ["pd.percent_complete"]) },
        knex.raw(`
            CASE
              WHEN pd.id IS NOT NULL THEN
                CONCAT(hi.colour_red, ',', hi.colour_green, ',', hi.colour_blue)
              ELSE NULL
            END AS colour_health
          `),
        "pd.deliverable_status"
      )
      .from(`data.project as p`)
      .join(`data.project_deliverable as pd`, "p.id", "pd.project_id")
      .join(`data.health_indicator as hi`, "hi.id", "pd.health_id")
      .where(function () {
        this.where("pd.is_expense", false).orWhereNull("pd.is_expense");
      })
      .andWhere("p.id", project_id),

  milestones: (project_id) =>
    knex
      .select([
        knex.raw(`COALESCE(pm.description, 'No Milestones') as description`),
        { target_completion_date: getFormattedDate("pm.target_completion_date") },
        { actual_completion_date: getFormattedDate("pm.actual_completion_date") },
        "pm.status",
        knex.raw(`
            CASE
              WHEN pm.description IS NOT NULL THEN
                CONCAT(hi.colour_red, ',', hi.colour_green, ',', hi.colour_blue)
              ELSE NULL
            END AS colour_health
          `),
      ])
      .from("data.project as p")
      .leftJoin("data.project_milestone as pm", "p.id", "pm.project_id")
      .leftJoin(`data.health_indicator as hi`, "hi.id", "pm.health_id")
      .where("p.id", project_id),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object} options         - Options object containing fiscal year.
 * @param   {string} options.project - The project id to filter on project id.  This param may be called project_id.
 * @returns {object}                 - An object containing report data and totals.
 */
const getAll = async ({ project: project_id }) => {
  try {
    // Await all promises in parallel
    const [projectData, statusData, deliverablesData, milestonesData] = await Promise.all([
      queries.project(project_id),
      queries.status(project_id),
      queries.deliverables(project_id),
      queries.milestones(project_id),
    ]);

    // Take the grouped data with totals and return it to the Controller.
    return {
      project: projectData,
      status: statusData,
      deliverables: deliverablesData,
      milestones: milestonesData,
    };
  } catch (error) {
    log.error(error);
    throw error;
  }
};

module.exports = {
  required: ["project"],
  getAll,
};
