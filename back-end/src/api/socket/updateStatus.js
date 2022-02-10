const services = require('../../database/services');

function updateStatus(server, socket) {
  socket.on('updateDbStatus', async ({ id, status }) => {
    await services.orders.changeStatus(id, status);
    server.emit('updateFrontStatus', { status });
  });
}

module.exports = updateStatus;
