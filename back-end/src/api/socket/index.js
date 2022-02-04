const ping = require('./ping');

module.exports = (server) => {
  server.on('connection', (socket) => {
    console.log(`Usuário: ${socket.id}`);
    ping(server, socket);
  });
};
