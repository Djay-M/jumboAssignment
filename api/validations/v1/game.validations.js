const { Joi } = require("celebrate");

module.exports = {
  // POST api/v1/games/create
  createGame: {
    body: {
      player1: Joi.string().required(),
      player2: Joi.string().required(),
    },
  },
};
