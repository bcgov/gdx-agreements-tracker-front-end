const useController = require("@controllers/useController");
const model = require("@models/projects/agreement");
const what = { single: "agreement", plural: "agreements" };
const controller = useController(model, what, "agreement");

module.exports = controller;
