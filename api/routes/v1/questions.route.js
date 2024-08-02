const express = require("express");
const router = express.Router();
const { celebrate: validate } = require("celebrate");
const controller = require("../../controllers/questions.controller");
const { createQuestion } = require("../../validations/v1/question.validations");
const { authorize } = require("../../middlewares/auth");

router
  .route("/getAllQuestions")
  /**
   * @api {GET} api/v1/questions/getAllQuestions
   * @apiDescription Fetch all questions
   * @apiVersion 1.0.0
   * @apiName fetchAllQuestions
   * @apiGroup Questions
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .get(authorize(), controller.listAllQuestions);

router
  .route("/create")
  /**
   * @api {POST} api/v1/questions/create
   * @apiDescription Create a new question
   * @apiVersion 1.0.0
   * @apiName createQuestion
   * @apiGroup Questions
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .post(
    validate(createQuestion, { allowUnknown: false }),
    authorize(),
    controller.createQuestion
  );

module.exports = router;
