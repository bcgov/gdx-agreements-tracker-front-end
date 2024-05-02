const controller = require("@controllers/projects/budget");
const validators = require("@validators/projects/budget");

const what = "budget";

const routes = [
  {
    method: "GET",
    url: `/projects/:id/${what}`,
    schema: validators.getAll,
    handler: controller.getAllByParentId,
  },
  {
    method: "GET",
    url: `/projects/${what}/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "GET",
    url: `/projects/:id/${what}/fiscalbreakdown`,
    schema: validators.fiscalBreakdown,
    handler: controller.fiscalBreakdown,
  },
  {
    method: "GET",
    url: `/projects/:id/${what}/recovered`,
    schema: validators.recovered,
    handler: controller.recovered,
  },
  {
    method: "GET",
    url: `/projects/:id/${what}/portfoliobreakdown`,
    schema: validators.portfoliobreakdown,
    handler: controller.portfolioBreakdown,
  },
  {
    method: "GET",
    url: `/projects/:id/${what}/deliverablesbreakdown`,
    schema: validators.deliverablesBreakdown,
    handler: controller.deliverablesBreakdown,
  },
  {
    method: "GET",
    url: `/projects/:id/${what}/recoverablesbreakdown`,
    schema: validators.recoverablesBreakdown,
    handler: controller.recoverablesBreakdown,
  },
  {
    method: "GET",
    url: `/responsibilityservice/:id`,
    // schema: validators.recoverablesBreakdown,
    handler: controller.getResponsibilityServiceLine,
  },
  {
    method: "PUT",
    url: `/projects/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/projects/${what}`,
    schema: validators.addOne,
    handler: controller.addOne,
  },
  {
    method: "DELETE",
    url: `/projects/${what}/:id`,
    schema: validators.deleteOne,
    handler: controller.deleteOne,
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
