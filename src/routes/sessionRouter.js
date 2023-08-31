const express = require("express");
const sessionRouter = express.Router();
const userModel = require("./Models/userModel");
const passport = require("passport");
const { createHash } = require("../utils/passwordHash");

sessionRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/failregister",
  }),
  (req, res) => {
    return res.redirect("/login");
  }
);

sessionRouter.get("/failregister", (req, res) => {
  return res.json({
    error: "Error al registrarse",
  });
});

sessionRouter.post("/login", passport.authenticate("login"), (req, res) => {
  return res.redirect("/api/products");
});

sessionRouter.get("/faillogin", (req, res) => {
  return res.json({
    error: "Error al iniciar sesion",
  });
});

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
