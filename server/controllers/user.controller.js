const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');

const config = require('../../config');

const createUser = async (req, res, next) => {
  try {
    let newUser = new User(req.body);
    newUser = await newUser.save();

    const payload = {
      sub: newUser._id,
      timestamp: new Date().getTime(),
    };
    const token = jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: config.JWT_EXPIRES_IN });

    const data = newUser.toResponse();
    data.token = token;

    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
};
