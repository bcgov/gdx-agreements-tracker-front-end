const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const internalCodingTable = `${dataBaseSchemas().data}.sid_internal_coding`;
const portfolioTable = `${dataBaseSchemas().data}.portfolio`;
const internalCodingTableRecoveryType = `${
  dataBaseSchemas().data
}.sid_internal_coding_recovery_type`;
const recoveryType = `${dataBaseSchemas().data}.recovery_type`;

// Get all.
const findAllById = (contractId) => {
  return knex(`${internalCodingTable} as ic`)
    .columns({
      id: "ic.id",
      portfolio: "po.portfolio_name",
      responsibility: "po.responsibility",
      service_line: "po.service_line",
      stob: "ic.stob",
      cas_project_number: "ic.cas_project_number",
      asset_tag: "ic.asset_tag",
      wip_number: "ic.wip_no",
      qualified_receiver: "ic.qualified_receiver",
      recovery_info: "rec.recovery_type_name",
    })
    .leftJoin(`${portfolioTable} as po`, "ic.portfolio_id", "po.id")
    .leftJoin(`${internalCodingTableRecoveryType} as icr`, "ic.id", "icr.sid_internal_coding_id")
    .leftJoin(`${recoveryType} as rec`, "icr.recovery_type_id", "rec.id")
    .where("ic.contract_id", contractId);
};

// Get specific one by id.
const findById = (codingId) => {
  return knex(`${internalCodingTable} as ic`)
    .columns({
      id: "ic.id",
      portfolio_id: knex.raw(
        "( SELECT json_build_object('value', po.id, 'label', COALESCE(po.portfolio_name,'')))"
      ),
      responsibility: "po.responsibility",
      service_line: "po.service_line",
      stob: "ic.stob",
      cas_project_number: "ic.cas_project_number",
      asset_tag: "ic.asset_tag",
      wip_no: "ic.wip_no",
      qualified_receiver: "ic.qualified_receiver",
      recovery_info: knex.raw(
        "(SELECT json_build_object('recovery_type_name', COALESCE(rec.recovery_type_name, ''), 'inactive', rec.inactive, 'value', icr.id))"
      ),
    })
    .leftJoin(`${portfolioTable} as po`, "ic.portfolio_id", "po.id")
    .leftJoin(`${internalCodingTableRecoveryType} as icr`, "ic.id", "icr.sid_internal_coding_id")
    .leftJoin(`${recoveryType} as rec`, "icr.recovery_type_id", "rec.id")
    .where("ic.id", codingId)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  const { recovery_info, ...request } = body;

  // Array to store promises
  const promises = [];

  // Delete existing records
  promises.push(knex(internalCodingTableRecoveryType).where("sid_internal_coding_id", id).del());

  // Insert new records if 'types' is present
  if (recovery_info) {
    promises.push(
      knex(internalCodingTableRecoveryType).insert({
        sid_internal_coding_id: id,
        recovery_type_id: recovery_info,
      })
    );
  }

  // Update 'request' if it is present
  if (Object.keys(request).length > 0) {
    promises.push(knex(internalCodingTable).where("id", id).update(request));
  }

  // Return a promise that resolves when all promises in the array resolve
  return Promise.all(promises);
};

// Add one.
const addOne = async (newCoding, contractId) => {
  const { recovery_info, ...body } = newCoding;

  try {
    const returnedClientCodingId = await knex(internalCodingTable)
      .returning("id")
      .insert({ ...body, contract_id: contractId });
    await knex(internalCodingTableRecoveryType).insert({
      sid_internal_coding_id: returnedClientCodingId[0].id,
      recovery_type_id: Number(recovery_info),
    });
    return returnedClientCodingId[0];
  } catch (error) {
    console.error("Error inserting rows:", error);
  }
};

module.exports = {
  findAllById,
  findById,
  updateOne,
  addOne,
};
