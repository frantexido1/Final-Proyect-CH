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
      const cartId = req.params.cid;
      const cart = await this.service.getCartByID(cartId);
      if (!cart) {
        return res.status(404).json({
          status: "[CONTROLLER]Carrito no encontrado",
        });
      }
      const products = cart.products.map((p) => p.toObject());
      return res.render("cartList", { products, cartId });
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
      const cartId = req.params.cid;
      const productId = req.params.pid;

      await this.service.addProductToCart(cartId, productId, 1);

      res.status(200).json({
        status: "[CONTROLLER] Producto agregado al carrito",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "[CONTROLLER] Error al agregar el producto al carrito",
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

  async purchaseCart(req, res) {
    try {
      const cartId = req.params.cid;
      const cart = await this.service.getCartByID(cartId);

      if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }
      for (const cartItem of cart.products) {
        const product = cartItem._id;

        if (product.stock >= cartItem.quantity) {
          product.stock -= cartItem.quantity;
          await product.save();
        } else {
          return res.status(400).json({
            message: `No hay suficiente stock para el producto con ID ${product._id}`,
          });
        }
      }
      cart.purchased = true;
      await cart.save();

      return res.status(200).json({ message: "Compra exitosa" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error en el proceso de compra" });
    }
  }
}

module.exports = CartController;
