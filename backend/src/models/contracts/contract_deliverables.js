const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.contract_deliverable`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;
const fiscalTable = `${dataBaseSchemas().data}.fiscal_year`;

// Get all.
const findAll = (contractId) => {
  return knex
    .select("fy.fiscal_year", "cr.id", "cr.*")
    .from(`${table} as cr`)
    .join(`${fiscalTable} as fy`, { "cr.fiscal": "fy.id" })
    .where("cr.contract_id", contractId);
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select({
      deliverable_name: "cd.deliverable_name",
      is_expense: "cd.is_expense",
      description: "cd.description",
      completion_date: "cd.completion_date",
      deliverable_amount: "cd.deliverable_amount",
      deliverable_status: knex.raw(`
        ( SELECT json_build_object(
          'value', cd.deliverable_status,
          'label', cd.deliverable_status
        ))
      `),
      project_deliverable_id: knex.raw(`
        (SELECT json_build_object(
          'deliverable_name', pd.deliverable_name,
          'deliverable_amount', pd.deliverable_amount,
          'deliverable_status', pd.deliverable_status,
          'value', pd.id
        ))
      `),
      fiscal: knex.raw("( SELECT json_build_object('value', fy.id, 'label', fy.fiscal_year))"),
      id: "cd.id",
    })
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
const addOne = (newDeliverable, contractId) => {
  newDeliverable.contract_id = contractId;
  return knex(table).insert(newDeliverable);
};

const removeOne = (deliverableId) => {
  return knex(`${table} as cd`).where("cd.id", deliverableId).del();
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
  removeOne,
};
