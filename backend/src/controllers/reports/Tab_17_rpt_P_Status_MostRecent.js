const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_17_rpt_P_Status_MostRecent");
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
controller.Tab_17_rpt_P_Status_MostRecent = async (request, reply) => {
  try {
    // Get the data from the database.
    const projectId = Number(request.query.project);
    const result = {
      //   project: await model.project(projectId),
      //   alignment: await model.alignment(projectId),
      //   status: await model.status(projectId),
      deliverables: await model.deliverables(projectId),
      milestones: await model.milestones(projectId),
    };

    // output this model's data in the console for debugging purposes.
    console.info(JSON.stringify(result, null, 2));

    const body = await getDocumentApiBody(result, "Tab_17_rpt_P_Status_MostRecent.docx");
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
