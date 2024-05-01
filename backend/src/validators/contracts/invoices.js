const {
  Schema,
  getResponse,
  getUpdateResponse,
  getAddResponse,
  getDeleteResponse,
} = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("received_date", S.string())
        .prop("invoice_date", S.string())
        .prop("due_date", S.string())
        .prop("billing_period", S.string())
        .prop("fiscal", S.string())
        .prop("invoice_total", S.string())
        .prop("invoice_number", S.string())
        .prop("is_gl", S.boolean())
        .prop("notes", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("received_date", S.string())
      .prop("due_date", S.anyOf([S.string(), S.null()]))
      .prop("invoice_date", S.anyOf([S.string(), S.null()]))
      .prop("billing_period", S.string())
      .prop("fiscal", Schema.Picker)
      .prop("invoice_number", S.string())
      .prop("invoice_total", S.string())
      .prop("is_gl", S.boolean())
      .prop("notes", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop("received_date", Schema.RequiredDate)
  .prop("invoice_date", Schema.Date)
  .prop("due_date", Schema.Date)
  .prop("billing_period", Schema.ShortString)
  .prop("fiscal", Schema.Id)
  .prop("invoice_number", Schema.ShortString)
  .prop("invoice_total", Schema.Money)
  .prop("is_gl", S.boolean())
  .prop("notes", S.string())
  .prop("contract_id", Schema.Id);

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody,
  response: getAddResponse(),
};

const deleteOne = {
  params: Schema.IdParam,
  response: getDeleteResponse(),
};

const findFiscalBySelectedRow = {
  params: Schema.IdParam,
  response: getResponse(S.object().prop("fiscal_id", Schema.Id)),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
  deleteOne,
  findFiscalBySelectedRow,
};
