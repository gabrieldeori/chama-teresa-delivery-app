const utils = require('../utils');

function validatePassword(password) {
  if (!password || password.length < 6) return false;
  return true;
}

function login(req, _res, nex) {
  try {
    const { email, password } = req.body;
    const validEmail = /\S+@\S+\.\S+/.test(email);
    
    if (!validEmail) return nex(utils.errors.invalidEmail);
    if (!password || password.length < 6) return nex(utils.errors.invalidPassword);
    
    return nex();
  } catch (e) {
    console.log(e);
  }
  return nex(utils.errors.internalServerError);
}

function register(req, _res, nex) {
  try {
    const { email, name, password } = req.body;
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const validPassword = validatePassword(password);
    
    if (name.length < 12) return nex(utils.errors.invalidName);
    if (!validEmail) return nex(utils.errors.invalidEmail);
    if (!validPassword) return nex(utils.errors.invalidPassword);
    
    return nex();
  } catch (e) {
    console.log(e);
  }
  return nex(utils.errors.internalServerError);
}

module.exports = {
  login,
  register,
};
