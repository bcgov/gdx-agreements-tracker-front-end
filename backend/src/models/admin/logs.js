const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().config}.db_logs`;
// Constant
const { dateFormatShortYear } = require("@helpers/standards");
// Get all.
const findAll = () => {
  return knex
    .select("*", { api_date: knex.raw(`to_char(l.api_date, '${dateFormatShortYear}')`) })
    .from(`${table} as l`);
};

module.exports = {
  findAll,
};
