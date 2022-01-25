async function ping() {
  // Exemplo:
  // Se for esperar alguma mensagem do banco fazer await
  // Devolver erro do assim por ex:
  // return { erro: 'Mensagem de erro', statusCode: status.BAD_REQUEST }
  const messageToReturn = 'Pong';
  return messageToReturn;
}

module.exports = ping;
