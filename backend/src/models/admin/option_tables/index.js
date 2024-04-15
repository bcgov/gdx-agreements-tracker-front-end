const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

const optionTablesModel = (request, id) => {
  const tableName = request.url.split("/")[1];
  const findAll = () => {
    return knex(`${tableName} as t`).columns({ label: "t.label" }, { id: "t.id" });
  };

  // Get specific one by id.
  const findById = () => {
    return knex
      .select({ label: "t.label" }, { id: "t.id" })
      .from(`${tableName} as t`)
      .where("t.id", id)
      .first();
  };

  const updateOne = () => {
    const { label } = request?.body || {};
    return knex(tableName).where("id", id).update({ value: label, label: label });
  };

  const addOne = () => {
    const { label } = request?.body || {};
    return knex(tableName).insert({ value: label, label: label });
  };

  const deleteOne = () => {
    return knex(tableName)
      .where("id", id)
      .del()
      .returning("*")
      .then((result) => {
        return result[0];
      });
  };

  return { findAll, findById, updateOne, addOne, deleteOne };
};

module.exports = {
  optionTablesModel,
};
