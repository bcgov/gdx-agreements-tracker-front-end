const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("supplier_name", S.string())
        .prop("signing_authority", S.string())
        .prop("financial_contact", S.string())
        .prop("province", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("address", S.string())
      .prop("city", S.string())
      .prop("country", S.string())
      .prop("fax", S.string())
      .prop("email", S.string())
      .prop("financial_contact_email", S.string())
      .prop("financial_contact_name", S.string())
      .prop("financial_contact_phone", S.string())
      .prop("phone", S.string())
      .prop("postal_code", S.string())
      .prop("province", S.string())
      .prop("signing_authority_name", S.string())
      .prop("signing_authority_title", S.string())
      .prop("site_number", S.string())
      .prop("supplier_legal_name", S.string())
      .prop("supplier_name", S.string())
      .prop("supplier_number", S.number())
      .prop("website", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop("address", Schema.ShortString)
  .prop("city", Schema.ShortString)
  .prop("country", Schema.ShortString)
  .prop("fax", Schema.Phone)
  .prop("email", Schema.Email)
  .prop("financial_contact_email", Schema.Email)
  .prop("financial_contact_name", Schema.ShortString)
  .prop("financial_contact_phone", Schema.Phone)
  .prop("phone", Schema.Phone)
  .prop("postal_code", Schema.ShortString)
  .prop("province", Schema.ShortString)
  .prop("signing_authority_name", Schema.ShortString)
  .prop("signing_authority_title", Schema.ShortString)
  .prop("site_number", Schema.ShortString)
  .prop("supplier_legal_name", Schema.ShortString)
  .prop("supplier_name", Schema.ShortString)
  .prop("supplier_number", Schema.Id)
  .prop("website", Schema.Uri);

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody,
  response: getAddResponse(),
};

const deleteOne = getOne;

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
  deleteOne,
};
