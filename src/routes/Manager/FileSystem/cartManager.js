const fs = require("fs").promises;

class CartManager {
  constructor() {
    this.carts = [];
    this.path = "./cart.json";

    this.init();
  }

  async init() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
      console.log("Archivo inicializado correctamente.");
    } catch (error) {
      console.error({ error });
    }
  }

  async getCartsByID(id) {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      return carts.find((cart) => cart.id === id);
    } catch (error) {
      return { error };
    }
  }

  async createCart(data) {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));

      const newCart = {
        id: carts.length + 1,
        products: [],
        ...data,
      };

      carts.push(newCart);
      await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
      return newCart;
    } catch (error) {
      console.error({ error });
    }
  }

  async updateCart(id, updatedCart) {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const cartIndex = carts.findIndex((cart) => cart.id === id);

      if (cartIndex !== -1) {
        carts[cartIndex].products = updatedCart.products;
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return true;
      }
    } catch (error) {
      console.error({ error });
    }
  }
}

module.exports = CartManager;
