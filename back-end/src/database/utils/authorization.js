const fs = require('fs');
const jwt = require('jsonwebtoken');

const errors = require('./errors');

const pathToKey = './jwt.evaluation.key';
const secret = fs.readFileSync(pathToKey, 'utf-8').trim();

const config = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

function create(data) {
  const token = jwt.sign({ data }, secret, config);
  return token;
}

function verify(token) {
  if (!token) return errors.tokenNotFound;
  try {
    const decoded = jwt.verify(token, secret);
    return { ok: true, ...decoded.data };
  } catch (_e) {
    return errors.tokenInvalidOrExpired;
  }
}

module.exports = {
  create,
  verify,
};
