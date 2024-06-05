const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_16_rpt_P_QuarterlyReview");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);
const log = require("../../facilities/logging")(module.filename);

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const { getReport, getDocumentApiBody, pdfConfig, getCurrentDate } = utils;
controller.getReport = getReport;

// Utilities
const { validateQueryParameters } = require("./helpers");

/**
 * Get a Project rollup Report for a specific array of portfolio.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.Tab_16_rpt_P_QuarterlyReview = async (request, reply) => {
  try {
    // Get the data from the database.
    const projectId = Number(request.query.project);
    const { templateType } = validateQueryParameters(request.query);
    const fiscal_breakdown = await model.getQuarterlyFiscalSummaries(projectId);
    const result = {
      project: await model.findById(projectId),
      deliverables: await model.getQuarterlyDeliverables(projectId, fiscal_breakdown),
      report_date: await getCurrentDate(),
    };
    log.info("RESULT OF TAB 16 queries:\n");
    log.info(fiscal_breakdown);

    const body = await getDocumentApiBody(
      result,
      "Tab_16_rpt_P_QuarterlyReview.xlsx",
      templateType
    );
    request.data = await cdogs.api.post("/template/render", body, pdfConfig);
    if (!result) {
      reply.code(404);
      return { message: `The ${what.single} with the specified id does not exist.` };
    } else {
      return result;
    }
  } catch (err) {
    console.error(`ERROR: ${err}`);
    reply.code(500);
    return { message: `There was a problem looking up this Project rollup Report.` };
  }
};

module.exports = controller;
