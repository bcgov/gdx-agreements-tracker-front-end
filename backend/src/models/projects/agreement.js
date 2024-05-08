const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const getFromView = `${dataBaseSchemas().data}.projects_with_json`;
const projectTable = `${dataBaseSchemas().data}.project`;

// Get specific one by id.
// Casts money types to float so values are numeric instead of string.
//s
const findById = (id) => {
  return knex(`${getFromView} as p`)
    .select(
      "p.agreement_type",
      "p.agreement_signed_date",
      "p.agreement_start_date",
      "p.agreement_end_date",
      "p.description",
      "p.notes"
    )
    .where("p.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(projectTable).where("id", id).update(body);
};

module.exports = {
  findById,
  updateOne,
};
