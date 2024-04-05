const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("contract_number", S.string())
        .prop("co_number", S.string().minLength(1))
        .prop("description", S.string())
        .prop("supplier", S.string())
        .prop("start_date", S.string())
        .prop("end_date", S.string())
        .prop("max_amount", S.string())
        .prop("remaining_amount", S.string())
        .prop("status", S.string())
        .prop("fiscal", S.string())
        .prop("project_number", S.string())
        .prop("portfolio", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("co_number", S.string().minLength(1))
      .prop("contract_number", S.string())
      .prop("requisition_number", S.string())
      .prop("start_date", S.string())
      .prop("end_date", S.string())
      .prop("description", S.string())
      .prop("notes", S.string())
      .prop("subcontractor_id", S.array().items(Schema.Picker))
      .prop("max_amount", S.string())
      .prop("total_fee_amount", S.string())
      .prop("total_expense_amount", S.string())
      .prop("status", Schema.Picker)
      .prop("fiscal", Schema.Picker)
      .prop(
        "project_id",
        S.object()
          .prop("project_number", S.string())
          .prop("project_name", S.string())
          .prop("project_status", S.string())
          .prop("value", S.number())
      )
      .prop("contract_type", Schema.Picker)
      .prop("supplier_id", Schema.Picker)
      .prop("procurement_method_id", Schema.Picker)
      .prop("project_name", S.string())
      .prop("total_project_budget", S.string())
  ),
};

const addUpdateBody = S.object()
  .additionalProperties(false)
  .prop("co_number", S.string())
  .prop("contract_number", S.string())
  .prop("contract_type", S.string())
  .prop("description", S.string())
  .prop("end_date", S.string())
  .prop("fiscal", Schema.Id)
  .prop("notes", S.string())
  .prop("procurement_method_id", S.oneOf([Schema.Id, S.const("")]))
  .prop("project_id", Schema.Id)
  .prop("requisition_number", Schema.ShortString)
  .prop("start_date", Schema.RequiredDate)
  .prop("status", S.string())
  .prop("subcontractor_id", S.array().items(Schema.Picker))
  .prop("supplier_id", Schema.Id)
  .prop("total_expense_amount", S.string())
  .prop("total_fee_amount", S.string());

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody,
  response: getAddResponse(),
};

const getBudgets = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("current_fiscal", S.boolean())
        .prop("fiscal", S.string())
        .prop("total_fees", Schema.Money)
        .prop("total_expenses", Schema.Money)
        .prop("total_fiscal_1", Schema.Money)
        .prop("total_hours", S.number())
        .prop("invoiced_hours", S.number())
        .prop("invoiced_fees", Schema.Money)
        .prop("invoiced_expenses", Schema.Money)
        .prop("total_fiscal_2", Schema.Money)
        .prop("remaining_hours", S.number())
        .prop("remaining_fees", Schema.Money)
        .prop("remaining_expenses", Schema.Money)
        .prop("total_fiscal_3", Schema.Money)
    )
  ),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
  getBudgets,
};
