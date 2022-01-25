const express = require('express');
const bodyParser = require('body-parser');
const cors = requier('cors');

const app = express();
const bodyParseJson = bodyParser.json();
const crossOriginResourceSharing = cors();

app.use(crossOriginResourceSharing);
app.use(bodyParseJson);

module.exports = app;
