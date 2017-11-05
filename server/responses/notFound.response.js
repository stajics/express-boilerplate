module.exports = (req, res) => (error) => {
  res.status(404);
  logger.error({
    date: new Date(),
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
    authorization: req.headers.authorization,
  });
  res.send({ error });
};
