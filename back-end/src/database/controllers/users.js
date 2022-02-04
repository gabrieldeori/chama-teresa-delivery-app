const services = require('../services');
const utils = require('../utils');

async function getAllUsers(_req, res, nex) {
  try {
    const response = await services.users.getAllUsers();
    if (response.error) return nex(response);
    return res
      .status(response.statusCode)
      .json(response.sendToFrontEnd);
  } catch (e) {
    console.log(e);
  }
  return nex(utils.errors.internalServerError);
}

async function getAllUsersByRole(req, res, nex) {
  const { role } = req.params;
  try {
    const response = await services.users.getAllUsersByRole({ role });
    if (response.error) return nex(response);

    return res
      .status(response.statusCode)
      .json(response.sendToFrontEnd);
  } catch (e) {
    console.log(e);
  }
  return nex(utils.errors.internalServerError);
}

async function getById(req, res, nex) {
  const { id } = req.params;
  try {
    const response = await services.users.getById({ id });
    if (response.error) return nex(response);

    return res
      .status(response.statusCode)
      .json(response.sendToFrontEnd);
  } catch (e) {
    console.log(e);
  }
  return nex(utils.errors.internalServerError);
}

async function login(req, res, nex) {
  try {
    const { email, password } = req.body;
    const dataToLoginUser = { email, password };
    const response = await services.users.login(dataToLoginUser);
    if (response.error) return nex(response);
    return res.status(response.statusCode).json(response.sendToFrontEnd);
  } catch (e) {
    console.log(e);
  }
  return nex(utils.errors.internalServerError);
}

async function register(req, res, nex) {
  try {
    const { name, email, password, role } = req.body;
    const dataToCreateUser = { name, email, password, role };
    const response = await services.users.create(dataToCreateUser);
    if (!response || response.error) nex(response);
    return res.status(response.statusCode).json(response.sendToFrontEnd);
  } catch (e) {
    console.log(e);
  }
  return nex(utils.errors.internalServerError);
}

async function deleteUser(req, res, nex) {
  try {
    const { email } = req.body;
    const { role } = req.user;
    if (role !== 'administrator') return nex(utils.errors.notAdmin)
    const response = await services.users.deleteUser(email);
    if (!response || response.error) nex(response);
    return res.status(response.statusCode).json(response.sendToFrontEnd);
  } catch (e) {
    console.log(e);
  }
  return nex(utils.errors.internalServerError);
}

module.exports = {
  getAllUsers,
  getAllUsersByRole,
  getById,
  login,
  register,
  deleteUser,
};
