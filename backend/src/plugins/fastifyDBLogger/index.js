const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const fp = require("fastify-plugin");
const { getUserInfo } = require("@facilities/keycloak");

const fastifyDBLogger = async (fastify) => {
  if (process.env.NODE_ENV !== "test") {
    const dbLogTable = `${dataBaseSchemas().config}.db_logs`;

    fastify.addHook("onSend", (request, reply, payload, done) => {
      const { method, body, url } = request;
      // Skip logging for GET and db_lock calls
      if ("GET" === method || "OPTIONS" === method || url.includes("db_lock")) return done();
      const requestUser = getUserInfo(request);
      try {
        const logData = {
          api_method: method,
          api_date: new Date(),
          api_user: requestUser?.name,
          api_body: "POST" === method || "DELETE" === method ? JSON.parse(payload) : body,
          api_url: url,
        };

        knex(dbLogTable)
          .insert(logData)
          .then(() => done())
          .catch((error) => {
            console.error("Database logging failed...", error);
            return done(error);
          });
      } catch (error) {
        console.error("Database logging failed...", error);
        return done(error);
      }
    });
  }
};

module.exports = fp(fastifyDBLogger, {
  fastify: "4.x",
  name: "fastifyDBLogger",
});
