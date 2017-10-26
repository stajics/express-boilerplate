const express = require('express');
const ev = require('express-validation');

const authRoute = require('./auth.route');

module.exports = () => {
  const router = new express.Router();

  router.use('/auth', authRoute);

  router.get('/', (req, res) => res.send('Server running!'));

  router.use((err, req, res, next) => {
    logger.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    next(err);
  });

  router.use((err, req, res, next) => { // eslint-disable-line
    if (err instanceof ev.ValidationError) {
      err.statusText = 'Payload Validation Error';
      return res.status(err.status).json(err);
    }

    if (err.statusCode) {
      return res.status(err.statusCode).json({
        error: err.message,
      });
    }

    return res.status(500).json({
      error: err.message,
    });
  });

  return router;
};
