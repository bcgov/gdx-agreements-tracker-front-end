const useCommonComponents = require("../useCommonComponents/index");
const useController = require("../useController/index");
const model = require("@models/reports/Tab_49_rpt_PF_NetRecoveries");
const utils = require("./helpers");
const what = { single: "report", plural: "reports" };
const controller = useController(model, what);
const _ = require("lodash");

// Template and data reading
const cdogs = useCommonComponents("cdogs");
const { getReport, getDocumentApiBody, pdfConfig, groupByProperty, getCurrentDate } = utils;
controller.getReport = getReport;

/**
 * Get a Project rollup Report for a specific array of portfolio.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.Tab_49_rpt_PF_NetRecoveries = async (request, reply) => {
  try {
    await controller.validate(request.query, reply, model.required);
    // Get the data from the database.
    const [{ fiscal_year }] = await model.getFiscalYear(request.query);
    const report = await model.Tab_49_rpt_PF_NetRecoveries(request.query);
    const report_totals = await model.Tab_49_totals(request.query);
    const current_date = await getCurrentDate();

    // shape the dataset so it can be parsed by the templating engine properly
    const reportByPortfolio = groupByProperty(report, "portfolio_name");
    const totalsByPortfolio = _.keyBy(report_totals, "portfolio_name");
    const reportsByPortfolioWithTotals = _.map(reportByPortfolio, (portfolio) => ({
      ...portfolio,
      portfolio_totals: totalsByPortfolio[portfolio.portfolio_name],
    }));

    const result = {
      fiscal: fiscal_year,
      report_date: await getCurrentDate(),
      report: reportsByPortfolioWithTotals,
      date: current_date,
    };

    const body = await getDocumentApiBody(result, "Tab_49_rpt_PF_NetRecoveries.docx");
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
    controller.failedQuery(reply, err.message, what);
  }
};

module.exports = controller;
