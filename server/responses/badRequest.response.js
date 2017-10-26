const util = require('util');

module.exports = (req, res) => (error) => {
  res.status(400);
  logger.error({
    date: new Date(),
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
    authorization: req.headers.authorization,
    errors: util.inspect(error),
  });
  res.send({ error });
};
