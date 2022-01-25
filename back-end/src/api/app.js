const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./router');

const app = express();
const bodyParseJson = bodyParser.json();
const crossOriginResourceSharing = cors();

app.use(crossOriginResourceSharing);
app.use(bodyParseJson);

app.get('/ping', router.ping);

module.exports = app;
