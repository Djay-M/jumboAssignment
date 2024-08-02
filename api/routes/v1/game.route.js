const express = require("express");
const router = express.Router();
const { celebrate: validate } = require("celebrate");
const controller = require("../../controllers/games.controller");
const { createGame } = require("../../validations/v1/game.validations");
const { authorize } = require("../../middlewares/auth");

router
  .route("/getAllGames")
  /**
   * @api {GET} api/v1/games/getAllGames
   * @apiDescription Fetch all games
   * @apiVersion 1.0.0
   * @apiName fetchAllGames
   * @apiGroup Games
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .get(authorize(), controller.getAllGames);

router
  .route("/create")
  /**
   * @api {POST} api/v1/games/create
   * @apiDescription Create a new game
   * @apiVersion 1.0.0
   * @apiName createGame
   * @apiGroup Games
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .post(
    validate(createGame, { allowUnknown: true }),
    authorize(),
    controller.createGame
  );

module.exports = router;
