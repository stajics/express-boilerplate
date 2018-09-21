const express = require('express');
const validate = require('express-validation');

const { createUser } = require('../controllers/user.controller');

const validator = require('../validators/auth.validator');

const router = new express.Router();

router.route('/signup')
  .post(validate(validator.signup), createUser);

module.exports = router;
