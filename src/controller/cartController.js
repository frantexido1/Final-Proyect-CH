const CartService = require("../service/cartService");

class CartController {
  constructor() {
    this.service = new CartService();
  }
  async getCarts(req, res) {
    try {
      res.send(await this.service.getCarts());
    } catch (error) {
      res
        .status(500)
        .json({ status: "[CONTROLLER]Error al obtener los carritos" });
    }
  }

  async getCartByID(req, res) {
    try {
      const cart = await this.service.getCartByID(req.params.cid);
      const products = cart.products.map((p) => p.toObject());
      return res.render("cartList", { products });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "[CONTROLLER]Error al obtener el carrito" });
    }
  }

  async createCart(req, res) {
    try {
      res.send(await this.service.createCart());
    } catch (error) {
      res.status(500).json({ status: "[CONTROLLER]Error al crear el carrito" });
    }
  }

  async deleteCart(req, res) {
    try {
      res.send(await this.service.deleteCart(req.params.cid));
    } catch (error) {
      res
        .status(500)
        .json({ status: "[CONTROLLER]Error al eliminar el carrito" });
    }
  }

  async addProductToCart(req, res) {
    try {
      res.send(
        await this.service.addProductToCart(req.params.cid, req.params.pid)
      );
    } catch (error) {
      res.status(500).json({
        status: "[CONTROLLER]Error al agregar el producto al carrito",
      });
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      res.send(
        await this.service.deleteProductFromCart(req.params.cid, req.params.pid)
      );
    } catch (error) {
      res.status(500).json({
        status: "[CONTROLLER]Error al eliminar el producto al carrito",
      });
    }
  }

  async deleteAllProductFromCart(req, res) {
    try {
      res.send(await this.service.deleteAllProductFromCart(req.params.cid));
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "[CONTROLLER]Error al eliminar todos los producto del carrito",
      });
    }
  }
}

module.exports = CartController;
