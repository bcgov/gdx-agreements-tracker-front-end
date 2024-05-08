const controller = require("@controllers/projects/agreement");
const validators = require("@validators/projects/agreement");
const what = "agreement";

const routes = [
  {
    method: "GET",
    url: `/projects/:id/${what}`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/projects/:id/${what}`,
    schema: validators.updateOne,
    handler: controller.updateOne,
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
