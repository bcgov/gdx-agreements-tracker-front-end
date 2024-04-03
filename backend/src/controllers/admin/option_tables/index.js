const model = require("@models/admin/option_tables");
const log = require("../../../facilities/logging.js")(module.filename);
/**
 * This is the callback for when a query fails, due to an improper syntax.
 *
 * @param {FastifyReply} reply FastifyReply is an instance of the standard http or http2 reply types.
 * @param {object}       error The error that gets generated from failed query.
 * @param {object}       what  The type of model being accessed
 */
const failedQuery = (reply, error) => {
  let statusCode = reply.statusCode;
  if (reply.statusCode <= 299) {
    statusCode = 500;
  }
  log.warn(error);
  reply.send(statusCode, reply, error);
};

/**
 * This is the callback for when the query was successful, but had no results.
 *
 * @param {FastifyReply} reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @param {string}       message The no query message.
 */
const noQuery = (reply, message) => {
  reply.code(404);
  throw new Error(message);
};

/**
 * Get all items.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getAll = async (request, reply) => {
  try {
    const result = await model.optionTablesModel(request).findAll();
    return result ? result : [];
  } catch (err) {
    return failedQuery(reply, err);
  }
};

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getOne = async (request, reply) => {
  const targetId = Number(request.params.id);
  try {
    const result = await model.optionTablesModel(request, targetId).findById();
    return !result
      ? noQuery(reply, `The request ${request.url} with the specified id does not exist.`)
      : result;
  } catch (err) {
    return failedQuery(reply, err);
  }
};

/**
 * Add an item based on request body info.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const addOne = async (request, reply) => {
  try {
    const result = await model.optionTablesModel(request).addOne();
    return result || noQuery(reply, `The request for ${request.url} could not be added.`);
  } catch (err) {
    return failedQuery(reply, err);
  }
};

/**
 * Update an item by ID. Use passed info from the request body.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const updateOne = async (request, reply) => {
  const targetId = Number(request.params.id);

  try {
    const result = await model.optionTablesModel(request, targetId).updateOne();
    return result || noQuery(reply, `The request for ${request.url} could not be updated.`);
  } catch (err) {
    return failedQuery(reply, err);
  }
};

/**
 * Delete an option
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const deleteOne = async (request, reply) => {
  const targetId = Number(request.params.id);

  try {
    const result = await model.optionTablesModel(request, targetId).deleteOne();
    return result || noQuery(reply, `The request for ${request.url} could not be deleted.`);
  } catch (err) {
    return failedQuery(reply, err);
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
