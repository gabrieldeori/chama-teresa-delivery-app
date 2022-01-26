const status = require('./status');

const errors = {
  userNonexistent: { error: 'Usuário não existe', statusCode: status.NOT_FOUND },
  userExists: { error: 'Usuário já existe', statusCode: status.CONFLICT },
  invalidPassword: { error: 'Senha incorreta', statusCode: status.UNAUTHORIZED },
};

module.exports = errors;
