const controller = require("@controllers/projects/deliverables");
const validators = require("@validators/projects/deliverables");
const what = "deliverables";

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
];
const registerRoutes = (fastify, options, done) => {
  // Ensure all of the routes above get registered.
  routes.forEach((route) => {
    fastify.route(route);
  });
  done();
};

module.exports = {
  registerRoutes,
};
