const express = require("express");
const responseError = require("../handlers/responseError");
const yup = require("yup");
const { ERROR_VALIDATE, NOT_FOUND } = require("../constants/errorCodeConstant");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schemaEmail = yup.string().email().required().required();
const schemaPassword = yup.string().min(6).max(20).required();
const schamaName = yup.string().min(6).max(50);

const userController = {
  register: async (req, res, next) => {
    const { name, email, password } = req.body;

    const schema = yup.object().shape({
      name: schamaName,
      email: schemaEmail,
      password: schemaPassword,
    });

    schema
      .validate(req.body, { abortEarly: false, stripUnknown: true })
      .then((result) => {
        const user = new User(result);
        user
          .save()
          .then(() => res.send(user))
          .catch((err) => next(err));
      })
      .catch((err) => {
        responseError(res, err.errors.join(" | "), ERROR_VALIDATE);
      });
  },

  login: async (req, res, next) => {
    const schema = yup.object().shape({
      email: schemaEmail,
      password: schemaPassword,
    });

    schema
      .validate(req.body, { abortEarly: false, stripUnknown: true })
      .then((data) => {
        const hashedPassword = bcrypt.hashSync(
          data.password,
          Number(process.env.ROUND_HASH)
        );

        User.findOne({ email: data.email })
          .then((user) => {
            if (!user) {
              return responseError(
                res,
                "Can not found email!",
                "NOT_FOUND_EMAIL",
                404
              );
            }

            if (!bcrypt.compareSync(data.password, user.password)) {
              return responseError(
                res,
                "Wrong password",
                "PASSWORD_NOT_MATCH",
                401
              );
            }
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            user.tokens.push(token);
            user
              .save()
              .then(() => {
                res.send({ user, token });
              })
              .catch((err) => next(err));
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        responseError(res, err.errors.join(" | "), ERROR_VALIDATE);
      });
  },

  about: (req, res, next) => {
    res.send(req.user);
  },
};

module.exports = userController;
