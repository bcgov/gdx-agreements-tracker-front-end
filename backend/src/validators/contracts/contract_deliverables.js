const {
  Schema,
  getResponse,
  getAddResponse,
  getUpdateResponse,
  getDeleteResponse,
} = require("../common_schema");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", Schema.Id)
  .prop("comments", Schema.ShortString)
  .prop("completion_date", Schema.Date)
  .prop("deliverable_amount", Schema.Money)
  .prop("deliverable_name", Schema.ShortString)
  .prop("deliverable_status", Schema.ShortString)
  .prop("description", Schema.ShortString)
  .prop("fiscal", S.number())
  .prop("is_expense", S.boolean())
  .prop("project_deliverable_id", S.number());

const requestBody = S.object()
  .prop("comments", Schema.ShortString)
  .prop("completion_date", Schema.Date)
  .prop("deliverable_amount", Schema.Money)
  .prop("deliverable_name", Schema.ShortString)
  .prop("deliverable_status", Schema.ShortString)
  .prop("description", Schema.ShortString)
  .prop("fiscal", S.number())
  .prop("is_expense", S.boolean())
  .prop("project_deliverable_id", S.number());

const getAll = {
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    body
      .without(["fiscal", "resource", "supplier_rate", "assignment_rate"])
      .prop("fiscal", Schema.Picker)
      .prop("supplier_rate_id", Schema.Picker)
      .prop("resource_id", Schema.Picker)
      .prop("assignment_rate", Schema.Money)
      .prop("contract_id", Schema.IdParam)
      .prop("id", S.number())
  ),
};

const updateOne = {
  params: Schema.IdParam,
  body: requestBody.minProperties(1),
  response: getUpdateResponse(),
};

const addOne = {
  params: Schema.IdParam,
  body: requestBody,
  response: getAddResponse(),
};

const deleteOne = {
  params: Schema.IdParam,
  response: getDeleteResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
  deleteOne,
};
