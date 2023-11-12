const express = require("express");
const productsRouter = require("./productsRouter");
const cartsRouter = require("./cartsRouter");
const sessionRouter = require("./sessionRouter");
const viewsRouter = express.Router();
const passport = require("passport");

viewsRouter.use(
  "/api/products",
  passport.authenticate("jwt", { session: false }),
  productsRouter
);

viewsRouter.use("/api/carts", cartsRouter);

viewsRouter.get("/register", (req, res) => {
  res.render("login/register");
});

viewsRouter.get("/login", (req, res) => {
  res.render("login/login");
});

viewsRouter.get("/email-address", (req, res) => {
  res.render("login/emailAddress");
});

viewsRouter.use("/api/sessions", sessionRouter);

module.exports = viewsRouter;
