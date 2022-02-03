const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routers');

const pathToPublicFolder = ('../../public');

const app = express();
const bodyParseJson = bodyParser.json();
const crossOriginResourceSharing = cors();

app.use(crossOriginResourceSharing);
app.use(bodyParseJson);
app.use(express.static(pathToPublicFolder));

app.use('/ping', router.ping);
app.use('/login', router.login);
app.use('/register', router.register);
app.use('/products', router.products);
app.use('/images', router.images);
app.use('/orders', router.orders);
app.use('/users', router.users);

module.exports = app;
