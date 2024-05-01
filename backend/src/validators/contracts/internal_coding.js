const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("portfolio", S.string())
        .prop("responsibility", S.string())
        .prop("service_line", S.string())
        .prop("stob", S.string())
        .prop("cas_project_number", S.string())
        .prop("qualified_receiver", S.string())
        .prop("recovery_info", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("portfolio_id", Schema.Picker)
      .prop("responsibility", S.string())
      .prop("service_line", S.string())
      .prop("stob", S.string())
      .prop("cas_project_number", S.string())
      .prop("qualified_receiver", S.string())
      .prop(
        "recovery_info",
        S.object()
          .prop("recovery_type_name", S.string())
          .prop("inactive", S.boolean())
          .prop("value", S.number())
      )
  ),
};

const addUpdateBody = S.object()
  .additionalProperties(false)
  .prop("contract_id", Schema.Id)
  .prop("portfolio_id", Schema.Id)
  .prop("stob", Schema.ShortString)
  .prop("cas_project_number", Schema.ShortString)
  .prop("qualified_receiver", Schema.ShortString)
  .prop("recovery_info", Schema.ShortString);

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getAddResponse(),
};

module.exports = {
  getOne,
  getAll,
  updateOne,
  addOne,
};
