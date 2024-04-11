const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_15_rpt_P_QuarterlyBillingRequest");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const { getReport, getDocumentApiBody, pdfConfig, getCurrentDate } = utils;
controller.getReport = getReport;

/**
 * Get a Project rollup Report for a specific array of portfolio.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.Tab_15_rpt_P_QuarterlyBillingRequest = async (request, reply) => {
  try {
    // Get the data from the database.
    const projectId = request.query.project
      ? Number(request.query.project)
      : Number(request.query.project_id);
    const fiscal = Number(request.query.fiscal_year_id);
    const quarter = Number(request.query.quarter);
    const result = {
      project: await model.getProjectById(projectId),
      deliverables: await model.getDeliverableBudgets(projectId, fiscal, quarter),
      jv: await model.getJournalVoucher(projectId, fiscal, quarter),
      client: await model.getClientCoding(projectId),
      quarter: "Q" + quarter,
      report_date: await getCurrentDate(),
    };

    // Calculate grand total from each deliverable amount.
    result.deliverables_total = result.deliverables.reduce((acc, d) => acc + d.amount, 0);
    const body = await getDocumentApiBody(result, "Tab_15_rpt_P_QuarterlyBillingRequest.docx");
    const pdf = await cdogs.api.post("/template/render", body, pdfConfig);

    // Inject the pdf data into the request object
    request.data = pdf;

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
