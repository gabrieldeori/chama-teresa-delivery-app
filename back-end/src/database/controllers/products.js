const services = require('../services');
const { status } = require('../utils');

async function getAll(_req, res, nex) {
  try {
    const response = await services.products.getAll();
    if (response.error) return nex(response);
    return res.status(response.statusCode).json(response.sendToFrontEnd);
  } catch (e) {
    console.log(e);
    return nex({ error: e, status: status.INTERNAL_SERVER_ERROR });
  }
}

module.exports = {
  getAll,
};
