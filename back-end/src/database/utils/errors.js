const status = require('./status');

const errors = {
  dbError: {
    error: { success: false, message: 'Erro no banco de dados', data: null },
    statusCode: status.INTERNAL_SERVER_ERROR,
  },
  incorrectPassword: {
    error: { success: false, message: 'Senha incorreta', data: null },
    statusCode: status.UNAUTHORIZED,
  },
  invalidEmail: {
    error: { success: false, message: 'Senha incorreta', data: null },
    statusCode: status.UNAUTHORIZED,
  },
  internalServerError: {
    error: { success: false, message: 'Erro interno do servidor', data: null },
    statusCode: status.INTERNAL_SERVER_ERROR,
  },
  noProducts: {
    error: { success: false, message: 'Nenhum produto cadastrado', data: null },
    statusCode: status.NOT_FOUND,
  },
  tokenNotFound: {
    error: { success: false, message: 'Token não encontrado', data: null },
    statusCode: status.UNAUTHORIZED,
  },
  tokenInvalidOrExpired: {
    error: { success: false, message: 'Token inválido ou expirado', data: null },
    statusCode: status.UNAUTHORIZED,
  },
  userExists: {
    error: { success: false, message: 'Usuário já existe', data: null },
    statusCode: status.CONFLICT,
  },
  userNonexistent: {
    error: { success: false, message: 'Usuário não existe', data: null },
    statusCode: status.NOT_FOUND,
  },
};

module.exports = errors;
