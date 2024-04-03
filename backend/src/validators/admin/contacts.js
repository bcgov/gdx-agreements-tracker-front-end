const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("last_name", S.string())
        .prop("first_name", S.string())
        .prop("job_title", S.string())
        .prop("ministry_id", S.string())
        .prop("notes", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("last_name", S.string())
      .prop("first_name", S.string())
      .prop("email", S.string())
      .prop("contact_phone", S.string())
      .prop("contact_title", S.string())
      .prop("business_area_id", S.number())
      .prop("address", S.string())
      .prop("city", S.string())
      .prop("province", S.string())
      .prop("postal", S.string())
      .prop("country", S.string())
      .prop("website", S.string())
      .prop("mobile", S.string())
      .prop("fax", S.string())
      .prop("notes", S.string())
      .prop("ministry_id", Schema.Picker)
  ),
};

const addUpdateBody = S.object()
  .prop("id", Schema.Id)
  .prop("last_name", Schema.ShortString.minLength(1))
  .prop("first_name", Schema.ShortString.minLength(1))
  .prop("email", Schema.Email)
  .prop("contact_phone", Schema.Phone)
  .prop("contact_title", Schema.ShortString)
  .prop("business_area_id", Schema.Id)
  .prop("address", Schema.ShortString)
  .prop("city", Schema.ShortString)
  .prop("province", Schema.ShortString)
  .prop("postal", Schema.ShortString)
  .prop("country", Schema.ShortString)
  .prop("website", Schema.Uri)
  .prop("mobile", Schema.Phone)
  .prop("fax", Schema.Phone)
  .prop("notes", S.string())
  .prop("ministry_id", Schema.Id);

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody.required(["first_name", "last_name"]),
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
