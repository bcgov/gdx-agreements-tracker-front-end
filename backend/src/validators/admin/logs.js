const { getResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("api_method", S.string())
        .prop("api_user", S.string())
        .prop("api_date", S.string())
        .prop("api_body", S.anyOf([S.object().additionalProperties(true), S.null()]))
        .prop("api_url", S.string())
    )
  ),
};

module.exports = { getAll };
