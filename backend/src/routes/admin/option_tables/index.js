const importedController = require("@controllers/admin/option_tables");
const importedValidators = require("@validators/admin/option_tables");

const optionTables = [
  "billing_period_option",
  "contract_status_option",
  "contract_type_option",
  "deliverable_status_option",
  "initiated_by_option",
  "project_billing_resource_type_option",
  "project_funding_option",
  "project_recoverable_option",
  "project_status_option",
  "project_type_option",
  "quarter_option",
  "yes_no_option",
];

const methods = ["GET", "GET", "PUT", "POST", "DELETE"];
const urls = ["", "/:id", "/:id", "", "/:id"];
const validators = [
  importedValidators.getAll,
  importedValidators.getOne,
  importedValidators.updateOne,
  importedValidators.addOne,
  importedValidators.deleteOne,
];
const handlers = [
  importedController.getAll,
  importedController.getOne,
  importedController.updateOne,
  importedController.addOne,
  importedController.deleteOne,
];

const routes = optionTables.flatMap((option) => {
  return methods.map((method, index) => {
    return {
      method,
      url: `/${option}${urls[index]}`,
      schema: validators[index],
      handler: handlers[index],
      config: {
        role: "PMO-Admin-Edit-Capability",
      },
    };
  });
});

const registerRoutes = (fastify, options, done) => {
  // Ensure all of the routes above get registered.
  routes.forEach((route) => fastify.route(route));
  done();
};

module.exports = {
  registerRoutes,
};
