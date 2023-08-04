const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./products.json";

    this.init();
  }

  async init() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
      console.log("Archivo inicializado correctamente.");
    } catch (error) {
      console.error({ error });
    }
  }

  async getProducts() {
    try {
      const productsData = await fs.readFile(this.path, "utf-8");
      return JSON.parse(productsData);
    } catch (error) {
      return { error };
    }
  }

  async getProductsByID(id) {
    try {
      const productsData = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(productsData);
      return products.find((product) => product.id === id);
    } catch (error) {
      return { error };
    }
  }

  async addProduct(data) {
    try {
      const productsData = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(productsData);

      if (!products.some((product) => product.code === data.code)) {
        data.id = products.length + 1;
        products.push(data);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return true;
      }
    } catch (error) {
      console.error({ error });
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex !== -1) {
        const updatedProduct = {
          ...products[productIndex],
          ...updatedFields,
        };
        products[productIndex] = updatedProduct;
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return true;
      }
    } catch (error) {
      console.error({ error });
    }
  }

  async deleteProduct(id) {
    try {
      const productsData = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(productsData);
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex !== -1) {
        products.splice(productIndex, 1);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return true;
      }
    } catch (error) {
      console.error({ error });
    }
  }
}

module.exports = ProductManager;
