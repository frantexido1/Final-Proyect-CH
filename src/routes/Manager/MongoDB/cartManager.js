const cartModel = require("../Models/cartModel");
const productModel = require("../Models/productModels");

class CartManager {
  constructor() {
    this.cartModel = cartModel;
    this.productModel = productModel;
  }

  async getCarts() {
    try {
      const cart = await this.cartModel.find();
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
  async addProductToCart(cid, pid) {
    try {
      const product = await this.productModel.findById(pid);
      const cart = await this.cartModel.findByIdAndUpdate(cid, {
        $push: { product: product },
      });
      return cart;
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

  async deleteCart(id) {
    try {
      const cart = await this.cartModel.findById(id);
      await this.cartModel.deleteOne(cart._id);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CartManager;
