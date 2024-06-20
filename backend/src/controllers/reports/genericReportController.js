// Libraries
const log = require("../../facilities/logging")(module.filename);
const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const cdogs = useCommonComponents("cdogs");
require("dotenv").config({ path: ".env" });

// constants
const env = process.env.NODE_ENV || "production";

// Utilities
const {
  getDocumentApiBody,
  getReportAndSetRequestHeaders,
  pdfConfig,
  validateQueryParameters,
  getCurrentDate,
} = require("./helpers");

// Constants
const what = { single: "report", plural: "reports" };

/**
 * USING THIS CONTROLLER:
 *
 * Look at the boilerplate example here: backend/src/models/reports/model_Boilerplate.js
 * or a actual report like backend/src/models/reports/Tab_44_rpt_PF_RecoveryToDateDetails.js
 */

/**
 * Retrieves a controller from the route.
 *
 * @returns {object} - The controller object.
 */
const getControllerFrom = () => {
  const getReport = getReportAndSetRequestHeaders();

  /**
   * Handles the generation and delivery of a report.
   *
   * @async
   * @param   {object}                 request - The request object containing information for generating the report.
   * @param   {object}                 reply   - The reply object used to send the response.
   * @returns {Promise<object | null>}         - A Promise that resolves to the generated report data or null if an error occurred.
   * @throws {Error} - If an unexpected error occurs during the report generation process.
   */
  const reportHandler = async (request, reply) => {
    let filename = request.params?.type;
    const model = require(`@models/reports/${filename}`);
    const controller = useController(model, what);

    try {
      const { query } = request;
      const { templateType } = validateQueryParameters(query);
      const modifiedGetReport = getReportAndSetRequestHeaders(templateType);
      controller.getReport = modifiedGetReport;
      const result = await getDataFromModel(query, model, reply);

      // todo: Remove conditional logic, once all reports are completed
      if ("removeme" !== result?.report) {
        // Converts template and data to report, and attaches the pdf blob to result
        await sendToCdogs({ result, filename, templateType, request });
      } else {
        controller.send(418, reply, "Report model not created");
      }

      return result;
    } catch (err) {
      controller.failedQuery(reply, err, what);
    }
  };

  return {
    getReport,
    reportHandler,
  };
};

/**
 * Retrieves data from a model based on fiscal or portfolio information.
 *
 * @param   {string|Array[string]|number} query - The parameters for retrieving data.
 * @param   {object}                      model - The model to retrieve data from.
 * @param   {object}                      reply - The reply object used to send the response.
 * @returns {Promise}                           - A promise that resolves with the retrieved data.
 */
const getDataFromModel = async (query, model, reply) => {
  /* The query we are passing to the model is a list of
   * query parameters we forward to the route from the front end dropdown menus.
   * most reports will either have query.fiscal (the fiscal year), query.date (date for the report period)
   *  or query.portfolio (portfolio for financial reports that summarize expenses costs, and recoveries)
   */

  // grab the model data with before/after timestamps
  const before = performance.now();
  const result = await model.getAll(query);
  const after = performance.now();
  // todo: remove this debugging once we have MVP ~ around Mid-September, 2023
  if ("development" === env) {
    log.warn(`
      DEBUG INFO FOR THIS REPORT:
      --------------------------------------------------------------
      ENVIRONMENT:
      ${JSON.stringify(env)}

      QUERY PARAMETERS:
      ${JSON.stringify(query, null, 2)}

      MODEL DATA:
      ${JSON.stringify(result, null, 2)}

      MODEL DATA RETRIEVED IN: ${(after - before).toFixed(2)} MS
      --------------------------------------------------------------
    `);
  }

  if (null === result) {
    reply.code(404);
    throw new Error(`There was a problem looking up this Report.`);
  }

  return {
    date: await getCurrentDate(),
    ...result,
  };
};

/**
 * Sends the result data to Cdogs for rendering a template.
 *
 * @param   {object}  params              - The parameters for sending to Cdogs.
 * @param   {any}     params.result       - The result data to be sent.
 * @param   {string}  params.filename     - The name of the file.
 * @param   {string}  params.templateType - The type of the template.
 * @param   {object}  params.request      - The request object.
 * @returns {Promise}                     - A promise that resolves when the data is sent to Cdogs.
 */
const sendToCdogs = async ({ result, filename, templateType, request }) => {
  const templateFileName = `${filename}.${templateType}`;
  const body = await getDocumentApiBody(result, templateFileName, templateType);
  request.data = await cdogs.api.post("/template/render", body, pdfConfig);
};

module.exports = getControllerFrom;
