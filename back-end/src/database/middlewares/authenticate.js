const utils = require('../utils');

function authenticate(req, _res, nex) {
  const { authorization } = req.headers;
  const response = utils.authorization.verify(authorization);
  if (response.error) return nex(response);
  if (response.ok) {
    req.user = response;
    return nex();
  };
  return nex(utils.errors.internalServerError);
}

module.exports = authenticate;
