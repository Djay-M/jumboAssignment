const { verifyJwt } = require("../config/auth.config");
const APIError = require("../utils/APIErrors");

exports.authorize = () => async (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
      return next(
        new APIError({
          status: 404,
          message: "Token not found in the Headers",
        })
      );
    }
    const token = jwtToken.split(" ")[1];
    const user = verifyJwt(token);
    if (user) {
      req.user = user;
      return next();
    }
    next(
      new APIError({
        status: 404,
        message: "Token Not Valid",
      })
    );
  } catch (error) {
    next(error);
  }
};
