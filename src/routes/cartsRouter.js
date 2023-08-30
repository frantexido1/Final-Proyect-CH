const express = require("express");
const carts = express.Router();
const CartManager = require("./Manager/cartManager");
const cartManager = new CartManager();

carts.get("/", async (req, res) => {
  try {
    res.send(await cartManager.getCarts());
  } catch (error) {
    res.status(500).json({ error });
  }
});

carts.post("/", async (req, res) => {
  try {
    res.send(await cartManager.createCart());
  } catch (error) {
    res.status(500).json({ error });
  }
});

carts.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartByID(req.params.cid);
    const products = cart.products.map((p) => p.toObject());
    return res.render("cartList", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

carts.put("/:cid/:pid", async (req, res) => {
  try {
    res.send(
      await cartManager.addProductToCart(req.params.cid, req.params.pid)
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

carts.delete("/:cid/products/:pid", async (req, res) => {
  try {
    res.send(
      await cartManager.deleteProductFromCart(req.params.cid, req.params.pid)
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar el producto del carrito" });
  }
});

carts.delete("/:cid/products/", async (req, res) => {
  try {
    res.send(await cartManager.deleteAllProductFromCart(req.params.cid));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar los producto del carrito" });
  }
});

carts.delete("/:cid", async (req, res) => {
  try {
    res.send(await cartManager.deleteCart(req.params.cid));
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = carts;
