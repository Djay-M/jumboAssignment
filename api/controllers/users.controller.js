const httpStatus = require("http-status");
const { genrateJwt } = require("../config/auth.config");
const Users = require("../models/User.model");
const APIError = require("../utils/APIErrors");
const _ = require("lodash");

exports.listAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find().lean();
    return res.json({
      status: 200,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    return res.json({
      status: 200,
      message: "Users created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (_.isEmpty(user)) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors:
          "User not found in system, please check the user or create a new user",
      });
    }

    if (!(await user.validatePassword(password))) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors:
          "User's username or password does not match, please check the details",
      });
    }

    return res.json({
      status: 200,
      message: "Users loggedIn successfully",
      token: `JWT ${genrateJwt(user)}`,
    });
  } catch (error) {
    next(error);
  }
};
