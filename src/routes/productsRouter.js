const express = require("express");
const products = express.Router();
const ProductsController = require("../controller/productsController");

const productsController = new ProductsController();

products.get("/", productsController.getProducts.bind(productsController));

products.get(
  "/:pid",
  productsController.getProductByID.bind(productsController)
);

products.post("/", productsController.addProduct.bind(productsController));

products.put(
  "/:pid",
  productsController.updateProduct.bind(productsController)
);

products.delete(
  "/:pid",
  productsController.deleteProduct.bind(productsController)
);

products.get("/controller/admin", (req, res) => {
  res.render("admin", req.user);
});

module.exports = products;
