const { Schema, getResponse, getUpdateResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("agreement_type", Schema.Picker)
      .prop("agreement_start_date", S.anyOf([S.string(), S.null()]))
      .prop("agreement_signed_date", S.anyOf([S.string(), S.null()]))
      .prop("agreement_end_date", S.anyOf([S.string(), S.null()]))
      .prop("description", S.string())
      .prop("notes", S.anyOf([S.string(), S.null()]))
  ),
};

const addUpdateBody = S.object() // Registration
  .prop("agreement_type", S.string())
  .prop("agreement_start_date", S.anyOf([S.null(), Schema.Date]))
  .prop("agreement_signed_date", S.anyOf([S.null(), Schema.Date]))
  .prop("agreement_end_date", S.anyOf([S.null(), Schema.Date]))
  .prop("description", S.string())
  .prop("notes", S.string());

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

module.exports = {
  getOne,
  updateOne,
};
