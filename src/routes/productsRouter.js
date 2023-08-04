const express = require("express");
const ProductManager = require("./Manager/MongoDB/productManager");
const productManager = new ProductManager();
const products = express.Router();

products.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    return res.render("home", { products });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

products.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productManager.getProductByID(pid);
    return res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

products.post("/", async (req, res) => {
  try {
    const body = req.body;
    productManager.addProduct(body);
    return res.status(201).json(body);
  } catch (error) {
    res.status(500).json({ status: "Internal Server Error", error });
  }
});

products.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const body = req.body;
    const product = await productManager.updateProduct(pid, body);

    return res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

products.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    res.send(await productManager.deleteProduct(pid));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = products;
