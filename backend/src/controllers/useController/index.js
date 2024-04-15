const log = require("../../facilities/logging.js")(module.filename);

const useController = (model, what, capabilityPrefix = null) => {
  capabilityPrefix = capabilityPrefix ?? what.plural;

  /**
   * This is the callback for when a query fails, due to an improper syntax.
   *
   * @param {FastifyReply} reply FastifyReply is an instance of the standard http or http2 reply types.
   * @param {object}       error The error that gets generated from failed query.
   * @param {object}       what  The type of model being accessed
   */
  const failedQuery = (reply, error, what) => {
    let statusCode = reply.statusCode;
    if (reply.statusCode <= 299) {
      statusCode = 500;
    }
    log.warn(error);
    send(statusCode, reply, error);
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
   * This adds a simple validator, for now it is just checking if it is defined, and has a value.
   *
   * @param {object} query    FastifyRequest is an instance of the standard http or http2 request objects.
   * @param {string} reply    The fastify reply object
   * @param {Array}  required The array of required fields
   */
  const validate = (query, reply, required) => {
    const found = required.some((value) => value in query);
    if (!found) {
      const warningMessage = `At least one of the following parameters is required: ${required.join(
        ", "
      )}`;
      send(400, reply, warningMessage);
    }
  };

  /**
   * Send function that verifies status code if it has change, not to send multiple requests.
   *
   * @param {number}       statusCode The status code.
   * @param {FastifyReply} reply      FastifyReply is an instance of the standard http or http2 reply types.
   * @param {string}       message    The message to display to indicate the issue.
   */
  const send = (statusCode, reply, message) => {
    reply.code(statusCode);
    reply.send({ message });
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
      const result = await model.findAll();
      return result ? result : [];
    } catch (err) {
      return failedQuery(reply, err, what);
    }
  };

  /**
   * Get all items belonging to a parent id.
   *
   * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
   * @returns {object}
   */
  const getAllByParentId = async (request, reply) => {
    try {
      const targetId = Number(request.params.id);
      const result = await model.findAllById(targetId);
      return result ? result : [];
    } catch (err) {
      return failedQuery(reply, err, what);
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
      const result = await model.findById(targetId);
      return !result
        ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
        : result;
    } catch (err) {
      return failedQuery(reply, err, what);
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
      const result = await model.addOne(request.body);
      return result || noQuery(reply, `The ${what.single} could not be added.`);
    } catch (err) {
      return failedQuery(reply, err, what);
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
    try {
      const result = await model.updateOne(request.body, Number(request.params.id));
      return result || noQuery(reply, `The ${what.single} could not be updated.`);
    } catch (err) {
      return failedQuery(reply, err, what);
    }
  };

  /**
   * Delete a user by user ID.
   *
   * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
   * @returns {object}
   */
  const deleteOne = async (request, reply) => {
    const id = Number(request.params.id);
    try {
      const result = await model.removeOne(id);
      return (
        result || noQuery(reply, `The ${what.single} ${request.params.id} could not be deleted.`)
      );
    } catch (err) {
      return failedQuery(reply, err, what);
    }
  };

  return {
    getAll,
    getAllByParentId,
    getOne,
    addOne,
    updateOne,
    deleteOne,
    failedQuery,
    noQuery,
    validate,
    send,
  };
};

module.exports = useController;
