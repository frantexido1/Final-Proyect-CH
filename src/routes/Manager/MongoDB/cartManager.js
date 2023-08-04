const cartModel = require("../Models/cartModel");
const productModel = require("../Models/productModels");

class CartManager {
  constructor() {
    this.cartModel = cartModel;
    this.productModel = productModel;
  }
  async createCart() {
    try {
      const cart = new this.cartModel([]);
      return await cart.save();
    } catch (error) {
      console.error(error);
    }
  }
  async addProductToCart(pid, cid) {
    try {
      const product = await this.productModel.findById(pid);
      const cart = await this.getCartByID(cid);
    } catch (error) {
      console.error(error);
    }
  }
  async getCartByID(id) {
    try {
      const cart = await this.cartModel.findById(id);
      return { id, cart };
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = CartManager;
