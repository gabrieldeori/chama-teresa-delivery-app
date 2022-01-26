const status = require('./status');

const errors = {
  userNonexistent: { error: 'Usuário não existe', statusCode: status.NOT_FOUND },
  userExists: { error: 'Usuário já existe', statusCode: status.CONFLICT },
  invalidPassword: { error: 'Senha incorreta', statusCode: status.UNAUTHORIZED },
  dbError: { error: 'Erro no banco de dados', status: status.INTERNAL_SERVER_ERROR },
};

module.exports = errors;
