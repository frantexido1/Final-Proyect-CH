const { Router } = require("express");
const productsRouter = require("./productsRouter");
const cartsRouter = require("./cartsRouter");
const viewsRouter = new Router();

viewsRouter.get("/api/products/admin", (req, res) => {
  res.render("admin");
});
viewsRouter.use("/api/products/", productsRouter);
viewsRouter.use("/api/cart/", cartsRouter);

module.exports = viewsRouter;
