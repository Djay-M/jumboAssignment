const Games = require("../models/Games.model");

exports.getAllGames = async (req, res, next) => {
  try {
    const games = await Games.find().lean();
    return res.json({
      status: 200,
      message: "Games fetched successfully",
      data: games,
    });
  } catch (error) {
    next(error);
  }
};

exports.createGame = async (req, res, next) => {
  try {
    const game = await Games.create(req.body);
    return res.json({
      status: 200,
      message: "Game created successfully",
      data: game,
    });
  } catch (error) {
    next(error);
  }
};
