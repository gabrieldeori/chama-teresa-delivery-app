const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routers');

const app = express();
const bodyParseJson = bodyParser.json();
const crossOriginResourceSharing = cors();

app.use(crossOriginResourceSharing);
app.use(bodyParseJson);

app.use('/ping', router.ping);
app.use('/login', router.login);
app.use('/register', router.register);
app.use('/products', router.products);

module.exports = app;
