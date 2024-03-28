const { Schema, getResponse, getUpdateResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const yesNoEnum = ["Yes", "No", "N/A", null];

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("project_number", S.string())
        .prop("project_name", S.string())
        .prop("version", S.string())
        .prop("portfolio_name", S.string())
        .prop("project_manager", S.string())
        .prop("registration_date", S.string())
        .prop("end_date", S.string())
        .prop("status", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("project_number", S.string())
      .prop("project_name", S.string())
      .prop("project_version", S.anyOf([S.string(), S.null()]))
      .prop("ministry_id", S.anyOf([Schema.Picker, S.null()]))
      .prop("initiation_date", S.anyOf([S.string(), S.null()]))
      .prop("portfolio_id", Schema.Picker)
      .prop("planned_start_date", S.anyOf([S.string(), S.null()]))
      .prop("fiscal", Schema.Picker)
      .prop("planned_end_date", S.anyOf([S.string(), S.null()]))
      .prop("planned_budget", S.string())
      .prop("project_type", Schema.Picker)
      .prop("project_status", Schema.Picker)
      .prop("project_manager", S.string())
      .prop("project_manager_email", S.string())
      .prop("funding", Schema.Picker)
      .prop("total_project_budget", S.string())
      .prop("recoverable", Schema.Picker)
      .prop("recoverable_amount", S.string())
      .prop("agreement_type", Schema.Picker)
      .prop("agreement_start_date", S.anyOf([S.string(), S.null()]))
      .prop("agreement_signed_date", S.anyOf([S.string(), S.null()]))
      .prop("agreement_end_date", S.anyOf([S.string(), S.null()]))
      .prop("description", S.string())
      .prop("notes", S.anyOf([S.string(), S.null()]))
      .prop(
        "contracts",
        S.array().items(S.object().prop("id", S.number()).prop("co_number", S.string()))
      )
  ),
};

const getOneCloseOut = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("close_out_date", S.string())
      .prop("completed_by_contact_id", Schema.Picker)
      .prop("actual_completion_date", S.string())
      .prop("hand_off_to_operations", Schema.Picker)
      .prop("records_filed", Schema.Picker)
      .prop("contract_ev_completed", Schema.Picker)
      .prop("contractor_security_terminated", Schema.Picker)
  ),
};

const addUpdateBody = S.object()
  // Registration
  .prop("project_number", Schema.ShortString.minLength(1))
  .prop("project_name", Schema.ShortString.minLength(1))
  .prop("project_version", Schema.ShortString)
  .prop("ministry_id", Schema.Id)
  .prop("initiation_date", S.anyOf([S.null(), Schema.Date]))
  .prop("portfolio_id", Schema.Id)
  .prop("planned_start_date", S.anyOf([S.null(), Schema.Date]))
  .prop("fiscal", Schema.Id)
  .prop("planned_end_date", S.anyOf([S.null(), Schema.Date]))
  .prop("planned_budget", S.string())
  .prop("project_type", S.string())
  .prop("project_status", S.string())
  .prop("funding", S.string())
  .prop("total_project_budget", S.string())
  .prop("recoverable", S.string())
  .prop("recoverable_amount", S.string())
  // Agreement
  .prop("agreement_type", S.string())
  .prop("agreement_start_date", S.anyOf([S.null(), Schema.Date]))
  .prop("agreement_signed_date", S.anyOf([S.null(), Schema.Date]))
  .prop("agreement_end_date", S.anyOf([S.null(), Schema.Date]))
  .prop("description", S.string())
  .prop("notes", S.string())
  // Close Out
  .prop("close_out_date", S.anyOf([S.null(), Schema.Date]))
  .prop("completed_by_contact_id", Schema.Id)
  .prop("actual_completion_date", S.anyOf([S.null(), Schema.Date]))
  .prop("hand_off_to_operations", Schema.Enum(yesNoEnum))
  .prop("records_filed", Schema.Enum(yesNoEnum))
  .prop("contract_ev_completed", Schema.Enum(yesNoEnum))
  .prop("contractor_security_terminated", Schema.Enum(yesNoEnum));

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const getLessonsLearnedById = {
  params: Schema.IdParam.prop("lessonsLearnedId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("lesson_category_id", Schema.Picker)
      .prop("lesson_sub_category", S.string())
      .prop("lesson", S.string())
      .prop("recommendations", S.string())
      .prop("id", S.number())
  ),
};

const getAllLessonsLearned = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("category", S.string())
        .prop("subcategory", S.string())
        .prop("lesson", S.string())
        .prop("recommendations", S.string())
        .prop("id", Schema.Id)
    )
  ),
};

module.exports = {
  getAll,
  getOne,
  getOneCloseOut,
  updateOne,
  getLessonsLearnedById,
  getAllLessonsLearned,
};
