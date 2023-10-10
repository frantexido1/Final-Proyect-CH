const CartStorage = require("../storage/cartStorage");

class CartService {
  constructor() {
    this.storage = new CartStorage();
  }
  async getCarts() {
    return await this.storage.getCarts();
  }

  async getCartByID(id) {
    return await this.storage.getCartByID(id);
  }

  async createCart() {
    return await this.storage.createCart();
  }

  async deleteCart(id) {
    return await this.storage.deleteCart(id);
  }

  async addProductToCart(cid, pid, quantity) {
    return await this.storage.addProductToCart(cid, pid, quantity);
  }
  async getProductCart(cartId, productId) {
    return await this.storage.getProductCart(cartId, productId);
  }

  async deleteProductFromCart(cartId, productId) {
    return await this.storage.deleteProductFromCart(cartId, productId);
  }

  async deleteAllProductFromCart(cartId) {
    return await this.storage.deleteAllProductFromCart(cartId);
  }
}

module.exports = CartService;
