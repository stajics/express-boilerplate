const passport = require('passport');

const login = (req, res) => {
  passport.authenticate('local-login', (err, token, user) => {
    if (err) return res.unauthorized(err);

    const data = user.toResponse();
    data.token = token;

    res.ok(data);
  })(req, res);
};

module.exports = {
  login,
};
