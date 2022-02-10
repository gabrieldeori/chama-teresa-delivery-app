const updateStatus = require('./updateStatus');

module.exports = (server) => {
  server.on('connection', (socket) => {
    updateStatus(server, socket);
  });
};
