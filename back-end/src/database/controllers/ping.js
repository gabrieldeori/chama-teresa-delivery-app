const services = require('../services');
const utils = require('../utils');

async function ping(_req, res, nex) { // Async Await caso seja necessário esperar resposta. :)
  const response = await services.ping();

  if (response.error) return nex(response);
  return res
    .status(response.statusCode)
    .json(response.sendToFrontEnd);
}

module.exports = ping;
