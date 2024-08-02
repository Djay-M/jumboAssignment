const express = require("express");
const router = express.Router();
const { celebrate: validate } = require("celebrate");
const controller = require("../../controllers/users.controller");
const {
  createUser,
  loginUser,
  getAllUsers,
} = require("../../validations/v1/user.validations");
const { authorize } = require("../../middlewares/auth");

router
  .route("/getAllUsers")
  /**
   * @api {GET} api/v1/users/getAllUsers
   * @apiDescription Fetch all users from user table
   * @apiVersion 1.0.0
   * @apiName fetchAllUsers
   * @apiGroup Users
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .get(authorize(), controller.listAllUsers);

router
  .route("/login")
  /**
   * @api {GET} api/v1/users/login
   * @apiDescription login a user
   * @apiVersion 1.0.0
   * @apiName loginUser
   * @apiGroup Users
   * @apiPermission admin, agent, user
   *
   * @apiSuccess {Object} Status, message, data
   */
  .post(validate(loginUser, { allowUnknown: false }), controller.loginUser);

router
  .route("/create")
  /**
   * @api {POST} api/v1/users/create
   * @apiDescription Create a new user
   * @apiVersion 1.0.0
   * @apiName createUser
   * @apiGroup Users
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .post(
    validate(createUser, { allowUnknown: false }),
    authorize(),
    controller.createUser
  );

module.exports = router;
