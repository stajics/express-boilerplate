const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const { expressLogger } = require('./logger.config.js');
const routes = require('../server/routes');
const responses = require('../server/responses');

const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};

// middleware
app.use(responses);
app.use(expressLogger);

app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true, parameterLimit: 50000 }));
app.use(passport.initialize());
// enable cors
app.options('*', cors());
app.use(cors());

app.use(allowCrossDomain);
app.use('/public', express.static(path.join(__dirname, '/../public')));
app.use('/', routes());

module.exports = app;
