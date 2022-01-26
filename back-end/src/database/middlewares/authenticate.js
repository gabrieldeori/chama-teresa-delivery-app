const utils = require('../utils');

function authenticate(req, _res, nex) {
  const { authorization } = req.headers;
  try {
    const response = utils.authorization.verify(authorization);
    if (response.error) return nex(response);
    if (response.ok) return nex();
    return nex({ error: 'Algo no token deu errado', status: utils.status.INTERNAL_SERVER_ERROR });
  } catch (e) {
    console.log(e);
    return nex({ error: e, status: utils.status.INTERNAL_SERVER_ERROR });
  }
}

module.exports = authenticate;
