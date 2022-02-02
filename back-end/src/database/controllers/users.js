const services = require('../services');
const utils = require('../utils');

async function getAllUsers(req, res, nex) {
  const { role } = req.params;
  try {
    const response = await services.users.getAllUsers({ role });
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

module.exports = {
  getAllUsers,
  getById,
  login,
  register,
};
