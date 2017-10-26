const ok = require('./ok.response');
const badRequest = require('./badRequest.response');
const serverError = require('./serverError.response');
const unauthorized = require('./unauthorized.response');
const notFound = require('./notFound.response');

module.exports = (req, res, next) => {
  res.ok = ok(req, res);
  res.badRequest = badRequest(req, res);
  res.serverError = serverError(req, res);
  res.unauthorized = unauthorized(req, res);
  res.notFound = notFound(req, res);
  next();
};
