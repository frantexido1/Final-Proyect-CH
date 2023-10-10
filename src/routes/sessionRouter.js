const express = require("express");
const passport = require("passport");
const sessionRouter = express.Router();
const {
  loginJWTController,
  registerJWTController,
  recoveryPasswordController,
} = require("../controller/userController");

sessionRouter.post("/register", registerJWTController);

sessionRouter.post("/login", loginJWTController);

sessionRouter.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.send(req.user);
  }
);

sessionRouter.post("/recovery-password", recoveryPasswordController);

module.exports = sessionRouter;
