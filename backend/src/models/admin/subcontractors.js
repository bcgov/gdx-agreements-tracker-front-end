const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.subcontractor`;
const contractSubcontractorsTable = `${dataBaseSchemas().data}.contract_subcontractor`;

// Get all.
const findAll = () => {
  return knex(table).select("id", "subcontractor_name");
};

// Get specific one by id.
const findById = (id) => {
  return knex(table).select("id", "subcontractor_name").where("id", id).first();
};

// Get all subcontractors belonging to the given contract.
const findByContractId = (contractId) => {
  return knex
    .select("s.id as value", "s.subcontractor_name as label")
    .from(`${table} as s`)
    .join(`${contractSubcontractorsTable} as cs`, { "s.id": "cs.subcontractor_id" })
    .where("cs.contract_id", contractId);
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (newSubcontractor) => {
  return knex(table).insert(newSubcontractor);
};

const removeOne = (id) => {
  return knex(table).where("id", id).del();
};

module.exports = {
  findAll,
  findById,
  findByContractId,
  updateOne,
  addOne,
  removeOne,
};
