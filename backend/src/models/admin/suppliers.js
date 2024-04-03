const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.supplier`;

// Get all.
const findAll = () => {
  return knex(table)
    .columns(
      "id",
      "supplier_name",
      { signing_authority: "signing_authority_name" },
      { financial_contact: "financial_contact_name" },
      "province"
    )
    .select()
    .orderBy("supplier_name", "asc");
};

// Get specific one by id.
const findById = (supplierId) => {
  return knex(table).where("id", supplierId).first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (supplier) => {
  return knex(table).insert(supplier);
};

const removeOne = (id) => {
  return knex(table).where("id", id).del();
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
  removeOne,
};
