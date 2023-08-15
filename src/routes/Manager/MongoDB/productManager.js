const productModel = require("../Models/productModel");

class ProductManager {
  constructor() {
    this.productModel = productModel;
  }
  async getProducts(filters) {
    try {
      const products = await this.productModel.paginate(
        JSON.parse(filters.query),
        {
          limit: filters.limit,
          page: filters.page,
          sort: filters.sort,
        }
      );
      return products.docs.map((p) => p.toObject());
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return [];
    }
  }

  async getProductByID(id) {
    try {
      return this.productModel.findById(id);
    } catch (error) {
      return console.error("Erro al obtener producto:", error);
    }
  }

  async addProduct(data) {
    try {
      const product = new this.productModel(data);
      await product.save();
      return true;
    } catch (error) {
      console.error("Error al agregar producto:", error);
      return false;
    }
  }

  async updateProduct(id, body) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) return false;
      const updatedProduct = {
        id: product._id,
        title: body.title || product.title,
        description: body.description || product.description,
        code: product.code,
        price: body.price || product.price,
        status: body.status || product.status,
        stock: body.stock || product.stock,
        category: body.category || product.category,
        thumbnail: body.thumbnail || product.thumbnail,
      };
      Object.assign(product, updatedProduct);
      await product.save();
      return updatedProduct;
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      const product = this.productModel.findById(id);
      if (!product) {
        throw new Error("Producto no existe");
      }
      await this.productModel.deleteOne({ _id: id });
      return { status: "deleted", product };
    } catch (error) {
      return { status: "Error al eliminar el producto:", product };
    }
  }
}

module.exports = ProductManager;
