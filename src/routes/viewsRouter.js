const express = require("express");
const viewsRouter = express.Router();
const passport = require("passport");
const productsRouter = require("./productsRouter");
const cartsRouter = require("./cartsRouter");
const sessionRouter = require("./sessionRouter");
const usersRouter = require("./usersRouter");

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

viewsRouter.use("/api/users", usersRouter);

module.exports = viewsRouter;
