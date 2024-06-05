require("dotenv").config({ path: ".env" });
require("module-alias/register");
const log = require("./facilities/logging.js")(module.filename);
const fastifyInstance = require("./facilities/fastify");
const port = process.env.SERVER_PORT || 8080;
const daemon = require("./facilities/daemon");

let fastifyOptions = {
  logger: log,
};

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
