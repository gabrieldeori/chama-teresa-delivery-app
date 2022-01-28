const utils = require('../utils');

function validatePassword(password) {
  if (!password || password.length < 6) return false;
  return true;
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function login(req, _res, nex) {
    const { email, password } = req.body;
    
    
    if (!validateEmail(email)) return nex(utils.errors.invalidEmail);
    if (!password || password.length < 6) return nex(utils.errors.invalidPassword);
    
    return nex();
}

function register(req, _res, nex) {
    const { email, name, password } = req.body;
    const validPassword = validatePassword(password);

    if (name.length < 12) return nex(utils.errors.invalidName);
    if (!validateEmail(email)) return nex(utils.errors.invalidEmail);
    if (!validPassword) return nex(utils.errors.invalidPassword);
    
    return nex();
}

module.exports = {
  login,
  register,
};
