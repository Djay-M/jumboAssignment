const jwt = require("jsonwebtoken");
const { jwtAccessTokenSecret, jwtRefreshTokenSecret } = require("./vars");
const APIError = require("../utils/APIErrors");
const httpStatus = require("http-status");
const _ = require("lodash");

exports.genrateJwt = (user) => {
  if (!_.isPlainObject(user)) {
    return jwt.sign(JSON.parse(JSON.stringify(user)), jwtAccessTokenSecret);
  }
  return jwt.sign(user, jwtAccessTokenSecret);
};

exports.verifyJwt = (token) => {
  try {
    const res = jwt.verify(token, jwtAccessTokenSecret);
    return res;
  } catch (error) {
    throw new APIError({
      code: httpStatus.UNAUTHORIZED,
      message: "Not a Valid Token",
    });
  }
};
