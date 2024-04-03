const controller = require("@controllers/admin/ministry");
const validators = require("@validators/admin/ministry");
const what = "ministries";

const routes = [
  {
    method: "GET",
    url: `/${what}`,
    schema: validators.getAll,
    handler: controller.getAll,
  },
  {
    method: "GET",
    url: `/${what}/:id`,
    schema: validators.getOne,
    handler: controller.getOne,
  },
  {
    method: "PUT",
    url: `/${what}/:id`,
    schema: validators.updateOne,
    handler: controller.updateOne,
  },
  {
    method: "POST",
    url: `/${what}`,
    schema: validators.addOne,
    handler: controller.addOne,
  },
  {
    method: "DELETE",
    url: `/${what}/:id`,
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
