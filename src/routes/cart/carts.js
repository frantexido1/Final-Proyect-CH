const Router = require("express");
const carts = Router();

const cartManager = require("./cartManager.js");
const productManager = require("../products/productManager.js");

carts.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartsByID(parseInt(req.params.cid));
    if (!cart) {
      res.status(404).json(`ID ${parseInt(req.params.pid)} Not Found`);
    } else {
      res
        .status(200)
        .json([
          `Carrito Encontrado con el ID ${parseInt(req.params.cid)}`,
          cart,
        ]);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

carts.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart(req.body);
    if (cart) {
      res.status(201).json(cart);
    } else {
      res.status(404).json("No se pudo crear el carrito");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

carts.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = await cartManager.getCartsByID(cartId);
    if (!cart) {
      res.status(404).json(`Carrito con ID ${cartId} no encontrado.`);
      return;
    }

    const product = await productManager.getProductsByID(productId);
    if (!product) {
      res.status(404).json(`Producto con ID ${productId} no encontrado.`);
      return;
    }

    const existingCartItem = cart.products.find(
      (item) => item.product === productId
    );
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      const newCartItem = {
        product: productId,
        quantity: 1,
      };
      cart.products.push(newCartItem);
    }

    await cartManager.updateCart(cartId, cart);

    res
      .status(200)
      .json(
        `Producto con ID ${productId} agregado al carrito con ID ${cartId}.`
      );
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = carts;
