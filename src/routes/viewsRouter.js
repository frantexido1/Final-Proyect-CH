const express = require("express");
const productsRouter = require("./productsRouter");
const cartsRouter = require("./cartsRouter");
const sessionRouter = require("./sessionRouter");
const viewsRouter = express.Router();
const passport = require("passport");

viewsRouter.get("/api/products/admin", (req, res) => {
  res.render("admin", req.user);
});

viewsRouter.get("/register", (req, res) => {
  res.render("login/register");
});

viewsRouter.get("/login", (req, res) => {
  res.render("login/login");
});

viewsRouter.get("/recovery-password", (req, res) => {
  res.render("login/recoveryPassword");
});

viewsRouter.use("/api/sessions", sessionRouter);

viewsRouter.use(
  "/api/products",
  passport.authenticate("jwt", { session: false }),
  productsRouter
);

viewsRouter.use("/api/carts", cartsRouter);

module.exports = viewsRouter;
