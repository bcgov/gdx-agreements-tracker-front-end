const controller = require("@controllers/reports");
const validators = require("@validators/report");
const what = "report";

const routes = [
  {
    method: "GET",
    url: `/${what}/projects/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/budget-summary`,
    handler: controller.getReport,
    onRequest: controller.getProjectBudgetReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-quarterly-review`,
    handler: controller.getReport,
    onRequest: controller.getProjectQuarterlyReviewReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-status-report`,
    handler: controller.getReport,
    onRequest: controller.getProjectStatusReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-status-summary`,
    handler: controller.getReport,
    onRequest: controller.getProjectStatusSummaryReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/projects/:id/project-quarterly-billing-request`,
    handler: controller.getReport,
    onRequest: controller.getProjectQuarterlyBillingReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/project-dashboard`,
    handler: controller.getProjectDashboardReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/active-projects`,
    handler: controller.getActiveProjectsReportOnRequest,
  },
  {
    method: "GET",
    url: `/${what}/project-lessons-learned`,
    handler: controller.getProjectLessonsLearnedReportOnRequest,
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
