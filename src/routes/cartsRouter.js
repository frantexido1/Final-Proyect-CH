const Router = require("express");
const carts = Router();
const CartManager = require("./Manager/MongoDB/cartManager");
const cartManager = new CartManager();

carts.get("/:cid", async (req, res) => {
  try {
    return await cartManager.getCartByID(req.params.cid);
  } catch (error) {
    res.status(500).json({ error });
  }
});

carts.post("/", async (req, res) => {
  try {
    return await cartManager.createCart();
  } catch (error) {
    console.error("Error al manejar la solicitud del carrito:", error);
    res
      .status(500)
      .json({ error: "Error al manejar la solicitud del carrito" });
  }
});

module.exports = carts;
