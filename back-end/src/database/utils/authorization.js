const fs = require('fs');
const jwt = require('jsonwebtoken');

const pathToKey = './jwt.evaluation.key';
const secret = fs.readFileSync(pathToKey, 'utf-8');

const config = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

function create(data) {
  const token = jwt.sign({ data }, secret, config);
  return token;
}

module.exports = {
  create,
};
