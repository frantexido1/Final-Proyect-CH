const cartModel = require("../models/cartModel");

class CartStorage {
  constructor() {
    this.cartModel = cartModel;
  }

  async getCarts() {
    try {
      const cart = await this.cartModel.find();
      return cart;
    } catch (error) {
      console.error(error);
    }
  }

  async getCartByID(id) {
    try {
      const cart = await this.cartModel.findById(id).populate("products._id");
      return cart;
    } catch (error) {
      console.error(error);
    }
  }

  async createCart() {
    try {
      const cart = new this.cartModel();
      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCart(id) {
    try {
      const cart = await this.cartModel.findById(id);
      await this.cartModel.deleteOne(cart._id);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid, quantity) {
    try {
      const cart = await this.cartModel.findById(cid);
      const productCart = cart.products.find((p) => p._id.toString() === pid);
      if (productCart) {
        productCart.quantity += quantity;
      } else {
        cart.products.push({ _id: pid, quantity });
      }
      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await this.cartModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const productIndex = cart.products.findIndex(
        (p) => p._id.toString() === productId
      );

      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        await cart.save();
      }

      return cart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteAllProductFromCart(cartId) {
    try {
      const cart = await this.cartModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      cart.products = [];
      await cart.save();

      return cart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = CartStorage;
