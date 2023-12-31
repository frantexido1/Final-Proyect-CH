const express = require("express");
const sessionRouter = express.Router();
const AuthController = require("../controller/sessionController");
const MongoStore = require("connect-mongo");
const authController = new AuthController();

sessionRouter.post("/login", authController.loginJWT.bind(authController));

sessionRouter.post(
  "/register",
  authController.registerJWT.bind(authController)
);

sessionRouter.get("/logout", authController.logout.bind(authController));

sessionRouter.post(
  "/email-address",
  authController.emailAddress.bind(authController)
);

sessionRouter.post(
  "/recovery-password/:token",
  authController.recoveryPassword.bind(authController)
);

module.exports = sessionRouter;
