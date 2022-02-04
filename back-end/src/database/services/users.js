const md5 = require('md5');
const models = require('../models');
const utils = require('../utils');
const { Op } = require("sequelize");

async function create({ name, email, password, role }) {
  const userExists = await models.User.findOne({ where: { email } });
  if (userExists) return utils.errors.userExists;
  const namedRole = utils.roles[role].name;

  const newUser = { name, email, password: md5(password), role: namedRole };
  const { id } = await models.User.create(newUser);
  if (!id) return utils.errors.dbError;
  const dataToToken = { email, name, role };
  const token = utils.authorization.create(dataToToken);
  const data = { id, token, ...dataToToken };
  const sendToFrontEnd = { success: true, message: 'Usuário cadastrado', data };
  return { sendToFrontEnd, statusCode: utils.status.CREATED };
}

async function deleteUser(email) {
  const deletedUser = await models.User.destroy({ where: { email } });
  if (!deletedUser) return utils.errors.notDeleted;
  const data = null;
  const sendToFrontEnd = { success: true, message: 'Usuário deletado', data };
  return { sendToFrontEnd, statusCode: utils.status.OK };
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

async function getAllUsers() {
  const users = await models.User.findAll({
    where: { role: { [Op.ne]: 'administrator' } },
    attributes: {exclude: ['password']},
});
  if (!users || users.length <= 0) return utils.errors.userNonexistent;
  const data = users;
  const sendToFrontEnd = {
    success: true,
    message: 'Usuários encontrados',
    data
  };
  return { sendToFrontEnd, statusCode: utils.status.OK };
 }

 async function getAllUsersByRole({ role }) {
  const users = await models.User.findAll({
    where: { role },
    attributes: {exclude: ['password']},
})
  if (!users || users.length <= 0) return utils.errors.userNonexistent;
  const data = users;
  const sendToFrontEnd = {
    success: true,
    message: 'Usuários encontrados',
    data
  };
  return { sendToFrontEnd, statusCode: utils.status.OK };
 }

 async function getById({ id }) { // /sellers/:id
  const user = await models.User.findOne({
    where: { id },
    attributes: {exclude: ['password']},
})
  if (!user || user.role !== 'seller') return utils.errors.notSeller;
  const data = user;
  const sendToFrontEnd = {
    success: true,
    message: 'Usuário Seller encontrado',
    data
  };
  return { sendToFrontEnd, statusCode: utils.status.OK };
 }

module.exports = {
  create,
  deleteUser,
  login,
  getAllUsers,
  getAllUsersByRole,
  getById,
};
