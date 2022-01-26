const services = require('../services');
const utils = require('../utils');

async function ping(_req, res, nex) { // Async Await caso seja necessário esperar resposta. :)
  try {
    const response = await services.ping();

    if (response.error) return nex(response);
    return res
      .status(response.statusCode)
      .json(response.sendToFrontEnd);
  } catch (e) {
    console.log(e);
  }
  return nex(utils.errors.internalServerError);
}

module.exports = ping;
