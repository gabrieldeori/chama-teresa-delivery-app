const models = require('../models');
const { authorization, errors, status } = require('../utils');

async function findEmail(email) {
  const response = await models.User.findOne({ where: { email } });
  return response;
}

async function login(email, password) {
  const userExists = await findEmail(email);
  if (!userExists) return errors.userNonexistent;
  if (password !== userExists.password) return errors.invalidPassword;
  const { name, role, dataValues: { id } } = userExists;
  const dataToToken = { email, name, role };
  const token = authorization.create(dataToToken);
  const sendToFrontEnd = { id, token, ...dataToToken };
  return { sendToFrontEnd, statusCode: status.OK };
}

module.exports = {
  login,
};
