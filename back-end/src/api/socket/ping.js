function pingPong(server, socket) {
  socket.on('ping', () => {
    console.log('PINGED');
    socket.emit('Pong', 'Pong');
  });
}

module.exports = pingPong;
