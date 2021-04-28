const mongoose = require("mongoose");
const { ERROR_MONGOOSE_VALIDATE } = require("../constants/errorCodeConstant");
const responseError = require("./responseError");

/*
  MongoDB Validation Error Handler
*/
exports.mongooseErrors = (err, req, res, next) => {
  // if (!err instanceof mongoose.Error.ValidationError) return next(err);

  console.log(2000);
  next(err);
  // const message = Object.keys(err.errors)
  //   .map((field) => err.errors[field].message)
  //   .join(" | ");
  // responseError(res, err, ERROR_MONGOOSE_VALIDATE, 400);
};

/*
  Development Error Handler
*/
exports.developmentInternalErrors = (err, req, res, next) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };

  res.status(err.status || 500).send(errorDetails); // send JSON back
};

/*
  Production Error Handler
  No stacktraces and error details are leaked to user
*/
exports.productionInternalErrors = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({
    error: "Internal Server Error",
  });
};

/*
  not found any routers
 */
exports.notFound = (req, res, next) => {
  res.status(404).send({ error: "Not Found" });
};
