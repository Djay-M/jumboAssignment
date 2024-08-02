const { Joi } = require("celebrate");

module.exports = {
  // POST api/v1/users/create
  createUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().optional(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  // POST api/v1/users/login
  loginUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
