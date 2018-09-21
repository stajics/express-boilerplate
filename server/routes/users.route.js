const express = require('express');
const validate = require('express-validation');

const isAuthenticated = require('../middlewares/isAuthenticated.midleware');

const { editUser } = require('../controllers/user.controller');

const validator = require('../validators/users.validator');

const router = new express.Router();

router.route('/:uid')
  .put(validate(validator.editUser), isAuthenticated, editUser);

module.exports = router;
