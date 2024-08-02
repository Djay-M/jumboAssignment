const { Joi } = require("celebrate");

module.exports = {
  // POST api/v1/question/create
  createQuestion: {
    body: {
      question: Joi.string().required(),
      options: Joi.array().items(Joi.string()).required(),
      correctOption: Joi.string().required(),
      questionNumber: Joi.number().required(),
    },
  },
};
