const controller = require("@controllers/reports/Tab_19_rpt_PA_ActiveProjectsbyPortfolio.js");
const { getReport } = require("@validators/report/index.js");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/Tab_19_rpt_PA_ActiveProjectsbyPortfolio`,
    schema: getReport,
    onRequest: controller.Tab_19_rpt_PA_ActiveProjectsbyPortfolio,
    handler: controller.getReport,
  },
];
const registerRoutes = (fastify, options, done) => {
  // Ensure all of the routes above get registered.
  routes.forEach((route) => fastify.route(route));
  done();
};

module.exports = {
  registerRoutes,
};
