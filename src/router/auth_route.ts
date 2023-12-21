const authRouter = require("express").Router();
const AuthController = require("../controller/auth_controller");

authRouter.post("/api/auth/register", AuthController.registerUser);
authRouter.post("/api/auth/login", AuthController.loginUser);

module.exports = authRouter;