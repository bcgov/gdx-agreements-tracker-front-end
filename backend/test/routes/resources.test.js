const model = require("../../src/models/resources.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/resources.js");

const capability = ["resources_update_all"];

testRoutes([
  {
    request: { method: "GET", url: "/resources" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/resources/1" },
    modelFunction: model.findById,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/resources/1",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: model.updateOne,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "/resources",
      payload: {
        subcontractor_name: "Test subcontractor",
      },
    },
    modelFunction: model.addOne,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
