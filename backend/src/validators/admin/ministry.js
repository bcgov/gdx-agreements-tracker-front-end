const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("Ministry/Organization Name", S.string())
        .prop("abbr", S.string())
        .prop("active", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("ministry_name", S.string())
      .prop("ministry_short_name", S.string())
      .prop("is_active", S.boolean())
  ),
};

const addUpdateBody = S.object()
  .prop("ministry_name", S.string())
  .prop("ministry_short_name", S.string())
  .prop("is_active", S.boolean());

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody.required(["ministry_name", "ministry_short_name"]),
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
