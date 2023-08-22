const express = require("express");
const productsRouter = require("./productsRouter");
const cartsRouter = require("./cartsRouter");
const sessionRouter = require("./sessionRouter");
const viewsRouter = express.Router();

const sessionMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  return next();
};

viewsRouter.get("/api/products/admin", sessionMiddleware, (req, res) => {
  const user = req.session.user;
  res.render("admin", user);
});

viewsRouter.get("/register", (req, res) => {
  res.render("login/register");
});

viewsRouter.get("/login", (req, res) => {
  res.render("login/login");
});

viewsRouter.use("/api/sessions", sessionRouter);

viewsRouter.use("/api/products", sessionMiddleware, productsRouter);

viewsRouter.use("/api/carts", sessionMiddleware, cartsRouter);

module.exports = viewsRouter;
