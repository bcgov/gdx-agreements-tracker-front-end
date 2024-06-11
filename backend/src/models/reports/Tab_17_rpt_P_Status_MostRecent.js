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
        status_date: knex.raw(`
            (SELECT TO_CHAR(ps.status_date, 'dd-Mon-yy')
            FROM data.project_status as ps
            WHERE ps.project_id = ${project_id}
            ORDER BY ps.status_date DESC
            LIMIT 1)
          `),
        divider: knex.raw(`'--------------------------------------------------------- '`),
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
};

// standard Models
// const { findById } = require("@models/projects"); // project
const {
  projectStatusReport, // deliverables
  getMilestones, // milestones
  getStrategicAlignment, // alignment
} = require("@models/reports/useProject");
const { findMostRecentStatusById } = require("@models/projects"); // status

// Exports the data in sections,  in the order we will use it with the template.
module.exports = {
  findById: queries.project, // project section
  projectStatusReport, // deliverables section
  getMilestones, // milestones section
  getStrategicAlignment, // alignment section
  findMostRecentStatusById, // status section
};
