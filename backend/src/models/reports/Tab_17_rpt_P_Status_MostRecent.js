// Libs
const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

const queries = {
  project: (project_id) =>
    knex("data.projects_with_json as p")
      .select({
        current_date: knex.raw(`TO_CHAR(NOW(), 'dd-Mon-yy')`), // Formatted current date
        project_name: knex.raw("p.project_number || ': ' || p.project_name"),
        project_manager: knex.raw("c.last_name || ', ' || c.first_name"),
        portfolio_label: knex.raw("p.portfolio_id::json ->> 'label'"), // Extracted portfolio label
        budget: "p.total_project_budget",
        gdx_executive: "gdx_exec.name",
        start_date: knex.raw(`TO_CHAR(p.agreement_start_date, 'dd-Mon-yy')`),
        end_date: knex.raw(`TO_CHAR(p.agreement_end_date, 'dd-Mon-yy')`),
        client_executive: "client_exec.name",
        ministry_label: knex.raw("p.ministry_id::json ->> 'label'"), // Extracted ministry Label.
        description: "p.description",
        goals: "p.project_goals",
      })
      .leftJoin(`data.contact as c`, "p.project_manager", "c.id")
      .leftJoin(
        function () {
          this.select("cp.project_id", knex.raw("c.last_name || ', ' || c.first_name as name"))
            .from("contact_project as cp")
            .join("contact as c", "cp.contact_id", "c.id")
            .where("cp.contact_role", 4) // GDX Executive Sponsor role is 4.
            .andWhere("cp.project_id", project_id)
            .as("gdx_exec");
        },
        "p.id",
        "gdx_exec.project_id"
      )
      .leftJoin(
        function () {
          this.select("cp.project_id", knex.raw("c.last_name || ', ' || c.first_name as name"))
            .from("contact_project as cp")
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
  alignment: (project_id) =>
    knex("data.project_strategic_alignment as psa")
      .select({ description: "sa.description" })
      .leftJoin("data.strategic_alignment as sa", "psa.strategic_alignment_id", "sa.id")
      .where({
        "psa.project_id": project_id,
        "psa.checked": true,
      }),

  status: (project_id) =>
    knex(`data.project_status as ps`)
      .select(
        {
          status_date: knex.raw(`TO_CHAR(ps.status_date, 'dd-Mon-yy')`),
          project_health: "health.health_name",
          project_red: "health.colour_red",
          project_green: "health.colour_green",
          project_blue: "health.colour_blue",
          reported_by: knex.raw("reported_by.last_name || ', ' || reported_by.first_name"),
          project_phase: "phase.phase_name",
        },
        {
          team_health: "team.health_name",
          team_red: "team.colour_red",
          team_green: "team.colour_green",
          team_blue: "team.colour_blue",
        },
        {
          budget_health: "budget.health_name",
          budget_red: "budget.colour_red",
          budget_green: "budget.colour_green",
          budget_blue: "budget.colour_blue",
        },
        {
          schedule_health: "schedule.health_name",
          schedule_red: "schedule.colour_red",
          schedule_green: "schedule.colour_green",
          schedule_blue: "schedule.colour_blue",
        },
        {
          general_progress_comments: "ps.general_progress_comments",
          issues_and_decisions: "ps.issues_and_decisions",
          forecast_and_next_steps: "ps.forecast_and_next_steps",
          identified_risk: "ps.identified_risk",
        }
      )
      .leftJoin(`data.project_phase as phase`, "ps.project_phase_id", "phase.id")
      .leftJoin(`data.health_indicator as health`, "ps.health_id", "health.id")
      .leftJoin(`data.health_indicator as schedule`, "ps.schedule_health_id", "schedule.id")
      .leftJoin(`data.health_indicator as budget`, "ps.budget_health_id", "budget.id")
      .leftJoin(`data.health_indicator as team`, "ps.team_health_id", "team.id")
      .leftJoin(`data.contact as reported_by`, "ps.reported_by_contact_id", "reported_by.id")
      .where("ps.project_id", project_id)
      .orderBy("ps.status_date", "desc")
      .first(),
};

// standard Models
const {
  projectStatusReport, // deliverables
  getMilestones, // milestones
} = require("@models/reports/useProject");

// TODO:
/*
replace queries for report Data
DONE 1) project status
2) deliverables
3) milestones
*/

// Exports the data in sections,  in the order we will use it with the template.
module.exports = {
  project: queries.project, // project section
  alignment: queries.alignment, // alignment section
  status: queries.status, // status section
  deliverables: projectStatusReport, // deliverables section
  milestones: getMilestones, // milestones section
};
