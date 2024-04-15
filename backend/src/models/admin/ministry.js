const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.ministry`;

// Get all.
const findAll = () => {
  return knex(table)
    .columns(
      "id",
      { "Ministry/Organization Name": "ministry_name" },
      { abbr: "ministry_short_name" },
      { active: knex.raw("(CASE WHEN is_active THEN 'Yes' ELSE 'No' END)") }
    )
    .select()
    .orderBy("ministry_name", "asc");
};

// Get specific one by id.
const findById = (id) => {
  return knex(table)
    .select("id", "ministry_name", "ministry_short_name", "is_active")
    .where("id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (newMinistry) => {
  return knex(table).insert(newMinistry);
};

const removeOne = (id) => {
  return knex(table)
    .where("id", id)
    .del()
    .returning("*")
    .then((result) => {
      return result[0];
    });
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
  removeOne,
};
