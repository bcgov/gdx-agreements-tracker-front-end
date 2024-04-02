exports.up = function (knex) {
  return knex.schema.withSchema("config").createTable("quarter_option", function (table) {
    table
      .increments("id")
      .primary()
      .notNullable()
      .defaultTo(knex.raw("nextval('config.id_seq'::regclass)"));
    table.string("label");
    table.string("value");
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema("config").dropTable("quarter_option");
};
