const {
  Schema,
  getResponse,
  getUpdateResponse,
  getAddResponse,
  getDeleteResponse,
} = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("q1_amount", S.string())
        .prop("q1_recovered", S.boolean())
        .prop("q2_amount", S.string())
        .prop("q2_recovered", S.boolean())
        .prop("q3_amount", S.string())
        .prop("q3_recovered", S.boolean())
        .prop("q4_amount", S.string())
        .prop("q4_recovered", S.boolean())
        .prop("fiscal", S.string())
        .prop("notes", S.anyOf([S.string(), S.null()]))
        .prop("project_deliverable_id", S.string())
        .prop("detail_amount", S.string())
        .prop("recovery_area", S.anyOf([S.string(), S.null()]))
        .prop("resource_type", S.string())
        .prop("responsibility_centre", S.string())
        .prop("service_line", S.string())
        .prop("stob", S.string())
        .prop("client_coding_id", S.string())
        .prop("contract_id", S.anyOf([S.string(), S.null()]))
        .prop("total", S.string())
    )
  ),
};

const getOne = {
  params: S.object().prop("changeRequestId", Schema.Id).prop("projectId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("q1_amount", S.string())
      .prop("q1_recovered", S.boolean())
      .prop("q2_amount", S.string())
      .prop("q2_recovered", S.boolean())
      .prop("q3_amount", S.string())
      .prop("q3_recovered", S.boolean())
      .prop("q4_amount", S.string())
      .prop("q4_recovered", S.boolean())
      .prop("fiscal", Schema.Picker)
      .prop("service_line", S.string())
      .prop("notes", S.anyOf([S.string(), S.null()]))
      .prop(
        "project_deliverable_id",
        S.object()
          .prop("deliverable_name", S.string())
          .prop("deliverable_id", S.number())
          .prop("value", S.number())
      )
      .prop("detail_amount", S.string())
      .prop(
        "recovery_area",
        S.object()
          .prop("portfolio_name", S.string())
          .prop("portfolio_abbrev", S.string())
          .prop("value", S.number())
      )
      .prop("resource_type", Schema.Picker)
      .prop("stob", S.string())
      .prop(
        "client_coding_id",
        S.object()
          .prop("program_area", S.string())
          .prop("financial_contact_name", S.string())
          .prop("ministry_short_name", S.string())
          .prop("value", S.number())
      )
      .prop(
        "contract_id",
        S.object()
          .prop("co_number", S.string())
          .prop("co_version", S.string())
          .prop("contract_number", S.string())
          .prop("value", S.number())
      )
      .prop("responsibility_centre", S.string())
      .prop("total", S.string())
  ),
};

const addUpdateBody = S.object()
  .additionalProperties(false)
  .prop("id", S.number())
  .prop("q1_amount", S.string())
  .prop("q1_recovered", S.boolean())
  .prop("q2_amount", S.string())
  .prop("q2_recovered", S.boolean())
  .prop("q3_amount", S.string())
  .prop("q3_recovered", S.boolean())
  .prop("q4_amount", S.string())
  .prop("q4_recovered", S.boolean())
  .prop("fiscal", S.anyOf([S.number(), S.null()]))
  .prop("notes", S.anyOf([S.string(), S.null()]))
  .prop("project_deliverable_id", S.anyOf([S.number(), S.null()]))
  .prop("detail_amount", S.string())
  .prop("recovery_area", S.anyOf([S.number(), S.null()]))
  .prop("resource_type", S.anyOf([S.string(), S.null()]))
  .prop("recovery_area", S.string())
  .prop("stob", S.string())
  .prop("client_coding_id", S.anyOf([S.number(), S.null()]))
  .prop("contract_id", S.anyOf([S.number(), S.null()]));

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody,
  response: getAddResponse(),
};

const fiscalBreakdown = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("fiscal_year", S.string())
        .prop("recovery_amount", S.string())
        .prop("recovered_amount", S.string())
        .prop("balance_remaining", S.string())
        .prop("q1_amount", S.string())
        .prop("q2_amount", S.string())
        .prop("q3_amount", S.string())
        .prop("q4_amount", S.string())
        .prop("id", S.string())
    )
  ),
};

const portfolioBreakdown = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("recovery_area", S.string())
        .prop("recovery_amount", S.string())
        .prop("recovered_to_date", S.string())
        .prop("balance_remaining", S.string())
        .prop("id", S.string())
    )
  ),
};

const deliverablesBreakdown = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("deliverable_name", S.string())
        .prop("recovery_amount", S.string())
        .prop("recovered_to_date", S.string())
        .prop("balance_remaining", S.string())
        .prop("id", S.string())
    )
  ),
};

const recoverablesBreakdown = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("total_project_budget", S.string())
        .prop("total_recoverable_amount", S.string())
    )
  ),
};

const deleteOne = {
  params: Schema.IdParam,
  response: getDeleteResponse(),
};

const recovered = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(S.object().prop("sum", S.string())),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
  fiscalBreakdown,
  portfolioBreakdown,
  deliverablesBreakdown,
  recoverablesBreakdown,
  deleteOne,
  recovered,
};
