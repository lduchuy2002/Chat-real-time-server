const yup = require("yup");
const { ERROR_VALIDATE } = require("../constants/errorCodeConstant");
const responseError = require("../handlers/responseError");
const Conversation = require("../model/Conversation");

const conversationController = {
  create: (req, res, next) => {
    const schema = yup.object().shape({
      users: yup.array().required().of(yup.string()),
      groupInfo: yup
        .object()
        .shape({
          name: yup.string(),
          owner: yup.string(),
        })
        .default(undefined),
    });
    schema
      .validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })
      .then((data) => {
        const con = new Conversation(data);
        con.save().then(res.send).catch(next);
      })
      .catch((err) => {
        responseError(res, err.errors.join(" | "), ERROR_VALIDATE);
      });
  },

  getMyConversation: async (req, res, next) => {
    const list = await Conversation.find({ users: req.user._id });
    res.send(list);
  },
};

module.exports = conversationController;
