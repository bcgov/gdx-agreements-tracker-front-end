const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("../../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object().prop("id", S.number()).prop("label", S.string()).prop("value", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object().prop("id", S.number()).prop("label", S.string()).prop("value", S.string())
  ),
};

const addUpdateBody = S.object().prop("label", S.string()).prop("value", S.string());

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
