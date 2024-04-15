const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.contact`;
const ministryTable = `${dataBaseSchemas().data}.ministry`;

// Get all.
const findAll = () => {
  return knex(`${table} as c`)
    .columns(
      "c.id",
      "c.last_name",
      "c.first_name",
      { job_title: "c.contact_title" },
      { ministry_id: "m.ministry_short_name" },
      "c.notes"
    )
    .select()
    .leftJoin(`${ministryTable} as m`, "c.ministry_id", "m.id")
    .orderBy([
      { column: "c.last_name", order: "asc" },
      { column: "c.first_name", order: "asc" },
    ]);
};

// Get specific one by id.
const findById = (contactId) => {
  return knex(`${table} as c`)
    .select(
      "c.*",
      knex.raw(
        "( SELECT json_build_object('value', m.id, 'label', m.ministry_name || ' ' || m.ministry_short_name) as ministry_id )"
      )
    )
    .leftJoin(`${ministryTable} as m`, "c.ministry_id", "m.id")
    .where("c.id", contactId)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

// Add one.
const addOne = (newContact) => {
  return knex(table).insert(newContact);
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
