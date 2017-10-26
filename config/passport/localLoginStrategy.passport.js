const { isEmpty } = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../');
const errors = require('../constants/errors.constant');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
}, async (email, password, next) => {
  try {
    const userData = {
      email: email.trim(),
      password: password.trim(),
    };

    const user = await User.findOne({ email: userData.email });
    if (isEmpty(user)) {
      return next(errors.badCredentials());
    }

    const isMatch = await user.comparePassword(userData.password);
    if (!isMatch) {
      return next(errors.badCredentials());
    }

    const payload = {
      sub: user._id,
      timestamp: new Date().getTime(),
    };
    const token = jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: config.JWT_EXPIRES_IN });

    return next(null, token, user);
  } catch (err) {
    next(err);
  }
});
