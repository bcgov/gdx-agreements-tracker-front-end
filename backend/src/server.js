require("dotenv").config({ path: ".env" });
require("module-alias/register");
const log = require("./facilities/logging.js")(module.filename);
const fastifyInstance = require("./facilities/fastify");
const port = process.env.SERVER_PORT || 8080;
const env = process.env.NODE_ENV || "production";
const daemon = require("./facilities/daemon");
const fs = require("fs");
const path = require("path");

let fastifyOptions = {
  logger: log,
};

if ("development" === env && process.platform !== "win32") {
  fastifyOptions.https = {
    key: fs.readFileSync(path.join(__dirname, "../../frontend/.cert/key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "../../frontend/.cert/cert.pem")),
  };
}

// Load server configuration and enable logging.
const server = fastifyInstance(fastifyOptions);

// Start the server.
const start = async () => {
  // Registers signal handlers for graceful shutdown.
  daemon.registerSignalHandlers();
  // Initialize connections to external services.
  daemon.initializeConnections();
  try {
    await server.listen({ port: port, host: "0.0.0.0" });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
