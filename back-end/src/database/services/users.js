const md5 = require('md5');
const models = require('../models');
const { authorization, errors, roles, status } = require('../utils');

async function create({ name, email, password }) {
  const userExists = await models.User.findOne({ where: { email } });
  if (userExists) return errors.userExists;
  const role = roles.customer;

  const newUser = { name, email, password: md5(password), role };
  const { id } = await models.User.create(newUser);
  if (!id) return errors.dbError;
  const dataToToken = { email, name, role };
  const token = authorization.create(dataToToken);
  const data = { id, token, ...dataToToken };
  const sendToFrontEnd = { success: true, message: 'Usuário cadastrado', data };
  return { sendToFrontEnd, statusCode: status.CREATED };
}

async function login({ email, password }) {
  const userExists = await models.User.findOne({ where: { email } });
  if (!userExists) return errors.userNonexistent;
  const md5Password = md5(password);
  if (md5Password !== userExists.password) return errors.incorrectPassword;
  const { name, role, dataValues: { id } } = userExists;
  const dataToToken = { email, name, role };
  const token = authorization.create(dataToToken);
  const data = { id, token, ...dataToToken };
  const sendToFrontEnd = { success: true, message: 'Sessão iniciada', data };
  return { sendToFrontEnd, statusCode: status.OK };
}

module.exports = {
  create,
  login,
};
