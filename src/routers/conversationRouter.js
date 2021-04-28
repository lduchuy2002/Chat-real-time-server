const conversationController = require("../controllers/conversationController");
const auth = require("../middlewares/auth");

const conversationRouter = require("express").Router();

conversationRouter.post("", auth, conversationController.create);
conversationRouter.get("", auth, conversationController.getMyConversation);

module.exports = conversationRouter;
