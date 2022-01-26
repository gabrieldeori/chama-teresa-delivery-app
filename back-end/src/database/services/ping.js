const utils = require('../utils');

async function ping() {
  const message = 'Pong';
  const sendToFrontEnd = {
    success: true,
    message,
    data: null,
  };
  const response = { sendToFrontEnd, statusCode: utils.status.OK };
  return response;
}

module.exports = ping;
