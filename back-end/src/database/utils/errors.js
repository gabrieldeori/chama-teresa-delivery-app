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
    error: { success: false, message: 'Email inválido', data: null },
    statusCode: status.BAD_REQUEST,
  },
  invalidName: {
    error: { success: false, message: 'Nome inválido', data: null },
    statusCode: status.BAD_REQUEST,
  },
  invalidPassword: {
    error: { success: false, message: 'Password inválido', data: null },
    statusCode: status.BAD_REQUEST,
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
  ordersNonexistent: {
    error: { success: false, message: 'Pedidos dessa natureza não existem', data: null },
    statusCode: status.NOT_FOUND,
  },
  userExists: {
    error: { success: false, message: 'Usuário já existe', data: null },
    statusCode: status.CONFLICT,
  },
  userNonexistent: {
    error: { success: false, message: 'Usuário não existe', data: null },
    statusCode: status.NOT_FOUND,
  },
  notSeller: {
    error: { success: false, message: 'Não é vendedor ou não existe', data: null },
    statusCode: status.NOT_FOUND,
  },
  notAdmin: {
    error: { success: false, message: 'Não é administrador', data: null },
    statusCode: status.UNAUTHORIZED,
  },
  notDeleted: {
    error: { success: false, message: 'Não foi possível deletar ou não existe', data: null },
    statusCode: status.NOT_FOUND,
  },
};

module.exports = errors;
