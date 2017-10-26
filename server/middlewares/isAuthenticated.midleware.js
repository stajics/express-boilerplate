const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const errors = require('../../config/constants/errors.constant');
const config = require('../../config');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

    const userId = decoded.sub;
    const user = await User.findById(userId);
    if (!user) return res.unauthorized(errors.invalidToken());

    req.user = user;

    return next();
  } catch (err) {
    return res.unauthorized(errors.invalidToken());
  }
};
