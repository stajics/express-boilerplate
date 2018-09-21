const Joi = require('joi');

module.exports = {
  editUser: {
    headers: {
      authorization: Joi.string().required(),
    },
    body: {
      firstName: Joi.string(),
      lastName: Joi.string(),
    },
  },
};
