const jwksClient = require("jwks-client");
const jwt = require("jsonwebtoken");

/**
 * Parse the request header for the authorization token.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @returns {Promise}
 */
const getBearerTokenFromRequest = (request) => {
  const authHeader = request?.headers?.authorization;
  // Strip out the token string from the request headers.
  if (authHeader && 0 === authHeader.indexOf("Bearer ")) {
    return authHeader.split(" ")[1];
  } else {
    return false;
  }
};

/**
 * Verify the token so the user can be authenticated.
 *
 * @param   {string}        token   Token json string from keycloak.
 * @param   {string | null} jwksUri URI to reach keycloak.
 * @returns {Promise}
 */
const verifyToken = (token, jwksUri = null) => {
  return new Promise((resolve, reject) => {
    const decodedToken = jwt.decode(token, { complete: true });
    const client = jwksClient({
      strictSsl: process.platform !== "win32" ? true : false,
      jwksUri: jwksUri,
    });

    /**
     * If a valid JWT header and header key ID were able to be parsed out,
     * proceed with token verification.
     */
    if (decodedToken?.header && decodedToken?.header?.kid) {
      const kid = decodedToken.header.kid;

      // Get the public key from the keycloak server which is used to verify the JWT.
      client.getSigningKey(kid, (err, key) => {
        if (err) {
          reject(new Error(`Signing key error. ${err}`));
        } else {
          // Verify the auth token given the public key from keycloak.
          jwt.verify(token, key.publicKey, (err, decodedToken) => {
            if (err) {
              reject(new Error(`Couldn't verify token. ${err}`));
            } else {
              // Successful authentication.
              resolve("Successfully verified jwt.");
            }
          });
        }
      });
    } else {
      reject(new Error("Couldn't parse out valid key ID."));
    }
  });
};

/**
 * Gets the User info based off the keycloak bearer token, and eventually the database information.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @todo  Get user info from the database, and merge with return object.
 * @todo  Add tests after logic becomes more stable.
 * @returns {object}                 The User object.
 */
const getUserInfo = (request) => {
  const token = getBearerTokenFromRequest(request);
  const decodedToken = jwt.decode(token, { complete: true });
  if (decodedToken) {
    const payload = decodedToken.payload;
    return {
      name: payload.name,
      email: payload.email,
      preferred_username: payload.idir_username,
      roles: payload?.client_roles,
    };
  }
  return;
};

const getRealmRoles = (request) => {
  const token = getBearerTokenFromRequest(request);
  const decodedToken = jwt.decode(token, { complete: true });
  return decodedToken?.payload?.client_roles || [];
};

module.exports = {
  getBearerTokenFromRequest,
  verifyToken,
  getUserInfo,
  getRealmRoles,
};
