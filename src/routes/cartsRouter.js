const Router = require("express");
const carts = Router();
const CartManager = require("./Manager/MongoDB/cartManager");
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
    res.send(await cartManager.getCartByID(req.params.cid));
  } catch (error) {
    res.status(500).json({ error });
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

carts.delete("/:cid", async (req, res) => {
  try {
    res.send(await cartManager.deleteCart(req.params.cid));
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = carts;
