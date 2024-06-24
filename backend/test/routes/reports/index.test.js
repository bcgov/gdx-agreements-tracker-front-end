const serverConfig = require("@facilities/fastify");
const { getBearerTokenFromRequest, verifyToken, getRealmRoles } = require("@facilities/keycloak");
jest.mock("@facilities/keycloak.js");
jest.mock("../../../src/controllers/useCommonComponents", () => {
  return jest.fn(() => {
    const replyPromise = new Promise((resolve, reject) => {
      resolve({ test: "value" });
    });
    const api = {
      get: async () => {
        return replyPromise;
      },
      post: async () => {
        return replyPromise;
      },
    };
    const getHealth = () => {
      return "ok";
    };
    return { api, getHealth };
  });
});

const testReport = (reportName) => {
  let app, requestObject;
  const requiredParams = `?templateType=xlsx&category=cat&exportType=pdf`;
  const bearerToken = "Bearer fake" + ".".repeat(1500);
  const model = require(`@models/reports/${reportName}`);
  jest.mock(`@models/reports/${reportName}`);

  /**
   * Start of the testing
   */
  describe("Report Testing", () => {
    beforeEach(() => {
      app = serverConfig();
      getBearerTokenFromRequest.mockReturnValueOnce(bearerToken);
      getRealmRoles.mockReturnValue(["PMO-Reports-Capability"]);
      verifyToken.mockResolvedValue("");
      requestObject = {
        method: "GET",
        url: `/report/${reportName}`,
        headers: {
          Authorization: bearerToken,
        },
      };
    });

    it(`${reportName} - Returns 400 Bad request, due to validator `, async () => {
      const response = await app.inject(requestObject);
      expect(response.statusCode).toBe(400);
    });

    it(`${reportName} - Returns 401 improper role`, async () => {
      requestObject.url = `${requestObject.url}${requiredParams}`;
      getRealmRoles.mockReturnValueOnce(["PMO-Not-Authenticate"]);
      const response = await app.inject(requestObject);
      expect(JSON.parse(response.body).data.message).toBe(
        "User doesn't have required role PMO-Reports-Capability"
      );
      expect(response.statusCode).toBe(401);
    });

    it(`${reportName} - Returns 200`, async () => {
      requestObject.url = `${requestObject.url}${requiredParams}&portfolio=2`;
      model.required = ["portfolio"];
      const response = await app.inject(requestObject);
      expect(response.statusCode).toBe(200);
    }, 10000);
  });
};

const reports = [
  //  { name: 'Tab_4_rpt_CA_Capital_GDX' },
  { name: "Tab_50_rpt_PF_NetRecoverySummaryByQuarter" },
  { name: "Tab_53_rpt_PF_FinProjectForecast-NEW" },
];

reports.forEach((report) => {
  testReport(report.name);
});
