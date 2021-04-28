const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

const userRouter = require("express").Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/about", auth, userController.about);

module.exports = userRouter;
