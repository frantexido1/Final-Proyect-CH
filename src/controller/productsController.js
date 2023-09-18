const ProductsService = require("../service/productService");

class ProductsController {
  constructor() {
    this.service = new ProductsService();
  }
  async getProducts(req, res) {
    try {
      const filters = {
        limit: req.query.limit || 10,
        page: parseInt(req.query.page) || 1,
        query: req.query.query || "{}",
      };

      if (req.query.sort) {
        filters.sort = req.query.sort === "desc" ? { price: -1 } : { price: 1 };
      }
      const user = req.session.user;
      const products = await this.service.getProducts(filters);
      return res.render("productList", { products, user });
    } catch (error) {
      res.status(500).send("[CONTROLLER]Error al obtener los productos");
    }
  }
  async getProductByID(req, res) {
    try {
      const pid = req.params.pid;
      const product = await this.service.getProductByID(pid);
      return res.json(product);
    } catch (error) {
      res
        .status(500)
        .json({ status: "[CONTROLLER]Error Al obtener el producto" });
    }
  }
  async addProduct(req, res) {
    try {
      let body = req.body;
      body.status = body.status === "on" ? true : false;
      await this.service.addProduct(body);
      return res.status(201).redirect(`/api/products`);
    } catch (error) {
      res.status(500).json({
        status: "[CONTROLLER]No se pudo agregar el producto correctamente",
        error,
      });
    }
  }
  async updateProduct(req, res) {
    try {
      const pid = req.params.pid;
      const body = req.body;
      const product = await this.service.updateProduct(pid, body);

      return res.json(product);
    } catch (error) {
      res.status(500).json({
        status: "[CONTROLLER]No se pudo modificar el producto correctamente",
        error,
      });
    }
  }
  async deleteProduct(req, res) {
    try {
      const pid = req.params.pid;
      res.send(await this.service.deleteProduct(pid));
    } catch (error) {
      res.status(500).json({
        status: "[CONTROLLER]No se pudo eliminar el producto correctamente",
        error,
      });
    }
  }
}

module.exports = ProductsController;
