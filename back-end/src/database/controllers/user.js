const services = require('../services');
const { status } = require('../utils');

async function login(req, res, nex) {
  try {
    const { email, password } = req.body;
    const response = await services.users.login(email, password);
    if (response.error) return nex(response);
    return res.status(response.statusCode).json(response.sendToFrontEnd);
  } catch (e) {
    console.log(e);
    return nex({ error: e, status: status.INTERNAL_SERVER_ERROR });
  }
}

module.exports = {
  login,
};
