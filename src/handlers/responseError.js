module.exports = function responseError(res, message, code, status = 400) {
  res.status(status).send({
    error: {
      message,
      code,
      status,
    },
  });
};
