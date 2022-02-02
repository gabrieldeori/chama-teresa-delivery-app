const { status } = require('../utils');

function login(_req, res) {
  return res.status(status.MOVE_PERMANENTLY).redirect('http://localhost:3000/login');
}

module.exports = {
  login,
};
