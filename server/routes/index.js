const express = require('express');
const ev = require('express-validation');

const authRoute = require('./auth.route');
const usersRoute = require('./users.route');

module.exports = () => {
  const router = new express.Router();

  router.use('/auth', authRoute);
  router.use('/users', usersRoute);

  // router.get('/', (req, res) => res.send('Server running!'));

  router.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // eslint-disable-next-line
  router.use((err, req, res, next) => {
    if (err instanceof ev.ValidationError) {
      err.statusText = 'Payload Validation Error'; // eslint-disable-line
    }
    logger.error(err.stack);
    switch (err.status) {
      case 401:
        return res.unauthorized(err);
      case 404:
        return res.notFound(err);
      case null:
      case undefined:
      case 500:
        return res.serverError(err);
      default:
        return res.badRequest(err);
    }
  });

  return router;
};
