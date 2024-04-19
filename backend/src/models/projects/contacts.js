const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.contact_project`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const contactRoleTable = `${dataBaseSchemas().data}.contact_role`;

const findAllById = async (projectId) => {
  return knex
    .with("combined_contacts", (qb) => {
      qb.select(
        "cp.id AS contact_project_id",
        "cp.contact_id",
        "cp.project_id",
        "cp.contact_role",
        knex.raw("c.last_name || ', ' || c.first_name AS contact_name")
      )
        .distinctOn("cp.contact_id", "cp.contact_role")
        .from(`${table} as cp`)
        .join(`${contactTable} as c`, "cp.contact_id", "c.id")
        .where("cp.project_id", projectId);
    })
    .select(
      "cr.id AS role_id",
      "cr.role_type",
      knex.raw(`
        CASE
            WHEN jsonb_agg(jsonb_build_object('value', combined_contacts.contact_id, 'label', combined_contacts.contact_name)) = '[{"label": null, "value": null}]'::jsonb THEN
                '[]'::json
            WHEN cr.id = 6 THEN
                (SELECT jsonb_build_object('value', cc.contact_id, 'label', cc.contact_name) FROM combined_contacts cc WHERE cc.contact_role = cr.id LIMIT 1)::json
            ELSE
                jsonb_agg(DISTINCT jsonb_build_object('value', combined_contacts.contact_id, 'label', combined_contacts.contact_name))::json
        END AS contacts
    `),
      knex.raw("array_agg(DISTINCT combined_contacts.contact_project_id) AS rows_to_lock")
    )
    .from(`${contactRoleTable} as cr`)
    .leftJoin("combined_contacts", "cr.id", "combined_contacts.contact_role")
    .groupBy("cr.id", "cr.role_type");
};

// Update one.
const updateOne = (contacts, projectId) => {
  return knex.transaction(async (trx) => {
    // First, delete all rows with the given project_id.
    await trx(table).where("project_id", projectId).del();

    // Then, insert the new rows.
    const insertedIds = await trx(table).insert(contacts).returning("id");

    return insertedIds;
  });
};

module.exports = {
  findAllById,
  updateOne,
};
