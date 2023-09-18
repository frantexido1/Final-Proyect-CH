const ProductsStorage = require("../storage/productsStorage");

class ProductsService {
  constructor() {
    this.storage = new ProductsStorage();
  }
  async getProducts(filters) {
    return await this.storage.getProducts(filters);
  }

  async getProductByID(id) {
    return await this.storage.getProductByID(id);
  }

  async addProduct(data) {
    return await this.storage.addProduct(data);
  }

  async updateProduct(id, body) {
    return await this.storage.updateProduct(id, body);
  }

  async deleteProduct(id) {
    return await this.storage.deleteProduct(id);
  }
}

module.exports = ProductsService;
