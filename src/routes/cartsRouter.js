const express = require("express");
const CartController = require("../controller/cartController");
const cartController = new CartController();
const carts = express.Router();

carts.get("/", cartController.getCarts.bind(cartController));

carts.get("/:cid", cartController.getCartByID.bind(cartController));

carts.post("/", cartController.createCart.bind(cartController));

carts.delete("/:cid", cartController.deleteCart.bind(cartController));

carts.put("/:cid/:pid", cartController.addProductToCart.bind(cartController));

carts.delete(
  "/:cid/products/:pid",
  cartController.deleteProductFromCart.bind(cartController)
);

carts.delete(
  "/:cid/products",
  cartController.deleteAllProductFromCart.bind(cartController)
);

carts.post("/:cid/purchase", cartController.purchaseCart.bind(cartController));

module.exports = carts;
