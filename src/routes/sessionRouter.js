const express = require("express");
const sessionRouter = express.Router();
const userModel = require("../storage/Models/userModel");
const passport = require("passport");
const { createHash } = require("../utils/passwordHash");

sessionRouter.post(
  "/register",
  passport.authenticate("register"),
  (req, res) => {
    return res.redirect("/login");
  }
);

sessionRouter.post("/login", passport.authenticate("login"), (req, res) => {
  return res.redirect("/api/products");
});

sessionRouter.get("/current", (req, res) => {
  res.send(req.user);
});

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

sessionRouter.get(
  "/github-callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    return res.redirect("/api/products");
  }
);

sessionRouter.post("/recovery-password", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({
      error: "El usuario no existe en el sistema",
    });
  }

  const newPassword = createHash(req.body.newPassword);
  await userModel.updateOne({ email: user.email }, { password: newPassword });

  return res.redirect("/login");
});

module.exports = sessionRouter;
