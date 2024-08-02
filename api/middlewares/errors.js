/* eslint-disable no-unused-vars */
const httpStatus = require("http-status");
const { map } = require("lodash");
const APIError = require("../utils/APIErrors");

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  res.status(err.status);
  res.json(response);
  res.end();
};
exports.handler = handler;

/**
 * If error is Validation Error, convert it.
 * @public
 */
exports.validationError = (err, req, res, next) => {
  const { joi, meta } = err;
  const error = new APIError({
    message: "Validation Error",
    errors: joi.message,
    status: httpStatus.BAD_REQUEST,
    stack: {
      source: meta.source,
      keys: joi.details
        ? map(joi.details, (detail) => detail.path.join("."))
        : [],
    },
  });

  return handler(error, req, res);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  let convertedError = err;

  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: "Not found",
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
