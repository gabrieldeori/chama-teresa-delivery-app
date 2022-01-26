const { status } = require('../utils');
async function ping() {
  // Exemplo:
  // Se for esperar alguma mensagem do banco fazer await
  // Devolver erro do assim por ex:
  // return { erro: 'Mensagem de erro', statusCode: status.BAD_REQUEST }
  const message = 'Pong';
  const sendToFrontEnd = {
    success: true,
    message,
    data: null,
  };
  const response = { sendToFrontEnd, statusCode: status.OK };
  return response;
}

module.exports = ping;
