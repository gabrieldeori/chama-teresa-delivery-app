const services = require('../services');
const { status } = require('../utils');

async function ping(_req, res, nex) {
  try {
    const response = await services.ping();
    if (response.error) return nex(response);
    return res.status(status.OK).json({ message: response.message });
  } catch (e) {
    console.log(e);
    return nex({ error: e, status: status.INTERNAL_SERVER_ERROR });
  }
}

module.exports = ping;
