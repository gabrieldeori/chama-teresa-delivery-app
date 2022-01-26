const models = require('../models');
const { authorization, errors, roles, status } = require('../utils');

async function create({ name, email, password }) {
  const userExists = await models.User.findOne({ where: { email } });
  if (userExists) return errors.userExists;
  const role = roles.customer;
  const newUser = { name, email, password, role };
  const { id } = await models.User.create(newUser);
  if (!id) return errors.dbError;
  const dataToToken = { email, name, role };
  const token = authorization.create(dataToToken);
  const sendToFrontEnd = { id, token, ...dataToToken };
  return { sendToFrontEnd, statusCode: status.CREATED };
}

async function login({ email, password }) {
  const userExists = await models.User.findOne({ where: { email } });
  if (!userExists) return errors.userNonexistent;
  if (password !== userExists.password) return errors.invalidPassword;
  const { name, role, dataValues: { id } } = userExists;
  const dataToToken = { email, name, role };
  const token = authorization.create(dataToToken);
  const sendToFrontEnd = { id, token, ...dataToToken };
  return { sendToFrontEnd, statusCode: status.OK };
}

module.exports = {
  create,
  login,
};
