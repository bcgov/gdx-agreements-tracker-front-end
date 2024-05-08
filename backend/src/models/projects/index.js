const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const projectTable = `${dataBaseSchemas().data}.project`;
const getFromView = `${dataBaseSchemas().data}.projects_with_json`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const portfolio = `${dataBaseSchemas().data}.portfolio`;
const projectStatusTable = `${dataBaseSchemas().data}.project_status`;
const projectPhaseTable = `${dataBaseSchemas().data}.project_phase`;
const healthTable = `${dataBaseSchemas().data}.health_indicator`;

const addNewProject = () => {
  return knex(projectTable)
    .insert({
      project_number: knex.raw("(select data.get_project_number() as project_number)"),
      project_name: "",
      project_status: "Active",
    })
    .returning("*")
    .then((result) => {
      return result[0];
    });
};

// Get all.
const findAll = () => {
  return knex(`${projectTable} as p`)
    .column([
      "p.id",
      "p.project_number",
      "p.project_name",
      { version: "p.project_version" },
      "port.portfolio_name",
      { project_manager: knex.raw("c.last_name || ', ' || c.first_name") },
      { registration_date: knex.raw(`p.initiation_date`) },
      { status: "p.project_status" },
    ])
    .select()
    .leftJoin(`${portfolio} as port`, "p.portfolio_id", "port.id")
    .leftJoin(`${contactTable} as c`, "p.project_manager", "c.id")
    .orderBy("p.id", "desc");
};

// Get specific one by id.
// Casts money types to float so values are numeric instead of string.
//
const findById = (id) => {
  return knex(`${getFromView} as p`)
    .select(
      "*",
      "p.id",
      "p.project_number",
      "p.project_name",
      "p.project_goals",
      { version: "p.project_version" },
      { project_manager: knex.raw("c.last_name || ', ' || c.first_name") },
      { project_manager_email: "c.email" },
      { portfolio: "p.portfolio_id" },
      { ministry_id: "p.ministry_id" },
      { registration_date: knex.raw(`p.initiation_date`) },
      knex.raw("planned_budget"),
      knex.raw("total_project_budget"),
      knex.raw("recoverable_amount")
    )
    .leftJoin(`${contactTable} as c`, "p.project_manager", "c.id")
    .where("p.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(projectTable).where("id", id).update(body);
};

// Get most recent status report
const findMostRecentStatusById = (id) => {
  return knex(`${projectStatusTable} as project`)
    .select(
      { project_phase: "phase.phase_name" },
      {
        project_health: "health.health_name",
        project_red: "health.colour_red",
        project_green: "health.colour_green",
        project_blue: "health.colour_blue",
      },
      {
        schedule_health: "schedule.health_name",
        schedule_red: "schedule.colour_red",
        schedule_green: "schedule.colour_green",
        schedule_blue: "schedule.colour_blue",
      },
      {
        budget_health: "budget.health_name",
        budget_red: "budget.colour_red",
        budget_green: "budget.colour_green",
        budget_blue: "budget.colour_blue",
      },
      {
        team_health: "team.health_name",
        team_red: "team.colour_red",
        team_green: "team.colour_green",
        team_blue: "team.colour_blue",
      },
      { reported_by: knex.raw("reported_by.last_name || ', ' || reported_by.first_name") },
      "project.status_date",
      "project.general_progress_comments",
      "project.issues_and_decisions",
      "project.forecast_and_next_steps",
      "project.identified_risk"
    )
    .leftJoin(`${projectPhaseTable} as phase`, "project.project_phase_id", "phase.id")
    .leftJoin(`${healthTable} as health`, "project.health_id", "health.id")
    .leftJoin(`${healthTable} as schedule`, "project.schedule_health_id", "schedule.id")
    .leftJoin(`${healthTable} as budget`, "project.budget_health_id", "budget.id")
    .leftJoin(`${healthTable} as team`, "project.team_health_id", "team.id")
    .leftJoin(`${contactTable} as reported_by`, "project.reported_by_contact_id", "reported_by.id")
    .where("project.project_id", id)
    .orderBy("project.status_date", "desc")
    .first();
};

module.exports = {
  findAll,
  findById,
  findMostRecentStatusById,
  updateOne,
  addNewProject,
};
