const express = require("express");
const productsRouter = require("./productsRouter");
const cartsRouter = require("./cartsRouter");
const loginRouter = require("./loginRouter");
const viewsRouter = express.Router();

viewsRouter.get("/api/products/admin", (req, res) => {
  res.render("admin");
});

viewsRouter.use("/login", loginRouter);

viewsRouter.use("/api/products/", productsRouter);

viewsRouter.use("/api/carts/", cartsRouter);

module.exports = viewsRouter;
