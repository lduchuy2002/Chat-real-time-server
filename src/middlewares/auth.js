const jwt = require("jsonwebtoken");
const { ERROR_TOKEN_INVALID } = require("../constants/errorCodeConstant");
const responseError = require("../handlers/responseError");
const User = require("../model/User");

const auth = async (req, res, next) => {
  if (!req.headers.authorization)
    return responseError(
      res,
      "Header authorization are required!",
      ERROR_TOKEN_INVALID,
      401
    );

  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (user) {
      req.user = user;
      next();
    } else {
      throw "error";
    }
  } catch (e) {
    return responseError(res, "Token not valid", ERROR_TOKEN_INVALID, 401);
  }
};

module.exports = auth;
