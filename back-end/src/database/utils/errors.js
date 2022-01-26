const status = require('./status');

const errors = {
  dbError: { error: 'Erro no banco de dados', status: status.INTERNAL_SERVER_ERROR },
  invalidPassword: { error: 'Senha incorreta', statusCode: status.UNAUTHORIZED },
  noProducts: { error: 'Nenhum produto cadastrado', statusCode: status.NOT_FOUND },
  userNonexistent: { error: 'Usuário não existe', statusCode: status.NOT_FOUND },
  userExists: { error: 'Usuário já existe', statusCode: status.CONFLICT },
};

module.exports = errors;
