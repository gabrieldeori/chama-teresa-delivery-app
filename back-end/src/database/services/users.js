const md5 = require('md5');
const models = require('../models');
const utils = require('../utils');

async function create({ name, email, password }) {
  const userExists = await models.User.findOne({ where: { email } });
  if (userExists) return utils.errors.userExists;
  const role = utils.roles.customer;

  const newUser = { name, email, password: md5(password), role };
  const { id } = await models.User.create(newUser);
  if (!id) return utils.errors.dbError;
  const dataToToken = { email, name, role };
  const token = utils.authorization.create(dataToToken);
  const data = { id, token, ...dataToToken };
  const sendToFrontEnd = { success: true, message: 'Usuário cadastrado', data };
  return { sendToFrontEnd, statusCode: utils.status.CREATED };
}

async function login({ email, password }) {
  const userExists = await models.User.findOne({ where: { email } });
  if (!userExists) return utils.errors.userNonexistent;
  const md5Password = md5(password);
  if (md5Password !== userExists.password) return utils.errors.incorrectPassword;
  const { name, role, dataValues: { id } } = userExists;
  const dataToToken = { email, name, role };
  const token = utils.authorization.create(dataToToken);
  const data = { id, token, ...dataToToken };
  const sendToFrontEnd = { success: true, message: 'Sessão iniciada', data };
  return { sendToFrontEnd, statusCode: utils.status.OK };
}

module.exports = {
  create,
  login,
};
