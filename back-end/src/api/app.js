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

module.exports = app;
