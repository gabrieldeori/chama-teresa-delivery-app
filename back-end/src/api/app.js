const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const router = require('./routers');
const socket = require('./socket');

const pathToPublicFolder = ('../../public');

const app = express();
const httpServer = http.createServer(app);
const bodyParseJson = bodyParser.json();
const crossOriginResourceSharing = cors();

app.use(crossOriginResourceSharing);
app.use(bodyParseJson);
app.use(express.static(pathToPublicFolder));

const newServer = socketio(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  } });

socket(newServer);

app.use('/ping', router.ping);
app.use('/login', router.login);
app.use('/register', router.register);
app.use('/products', router.products);
app.use('/images', router.images);
app.use('/orders', router.orders);
app.use('/users', router.users);

module.exports = httpServer;
