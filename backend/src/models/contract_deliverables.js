const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.contract_deliverable`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;
const fiscalTable = `${dataBaseSchemas().data}.fiscal_year`;

// Get all.
const findAll = (contractId) => {
  return knex
    .select("cr.id", "cr.*")
    .from(`${table} as cr`)
    .join(`${fiscalTable} as fy`, { "cr.fiscal": "fy.id" })
    .where("cr.contract_id", contractId);
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select(
      "cd.*",
      knex.raw("cd.deliverable_amount::numeric::float8"),
      knex.raw(
        "( SELECT json_build_object('value', COALESCE(cd.project_deliverable_id, 0), 'label', COALESCE(pd.deliverable_name, ''))) as project_deliverable_id"
      ),
      knex.raw("( SELECT json_build_object('value', fy.id, 'label', fy.fiscal_year)) as fiscal"),
      knex.raw(
        "( SELECT json_build_object('value', cd.deliverable_status, 'label', cd.deliverable_status)) as deliverable_status"
      )
    )
    .from(`${table} as cd`)
    .join(`${fiscalTable} as fy`, { "cd.fiscal": "fy.id" })
    .leftJoin(`${projectDeliverableTable} as pd`, { "cd.project_deliverable_id": "pd.id" })
    .where("cd.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (newResource, contractId) => {
  newResource.contract_id = contractId;
  newResource.start_date = "" === newResource.start_date ? null : newResource.start_date;
  newResource.end_date = "" === newResource.end_date ? null : newResource.end_date;
  return knex(table).insert(newResource);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
