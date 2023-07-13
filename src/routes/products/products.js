const express = require("express");
const productManager = require("./productManager.js");

const products = express.Router();

products.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = req.query.limit;
    const response = limit ? products.slice(0, limit) : products;
    res.render("home", { response });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

products.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    io.emit("productsData", { products });
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

products.get("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductsByID(pid);
    if (!product) {
      res.status(404).json(`Product with ID ${pid} Not Found`);
    } else {
      res.status(200).json([`Product Found with ID ${pid}`, product]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

products.post("/", async (req, res) => {
  try {
    const addedProduct = await productManager.addProduct(req.body);
    if (!addedProduct) {
      res.status(404).json(`The code ${req.body.code} has already been used.`);
    } else {
      res.status(201).json(["Product added to the database.", req.body]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

products.put("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const updatedProduct = await productManager.updateProduct(pid, req.body);
    if (!updatedProduct) {
      res.status(404).json(`No product found with ID ${pid}.`);
    } else {
      res.status(200).json(["Product updated successfully.", req.body]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

products.delete("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const deletedProduct = await productManager.deleteProduct(pid);
    if (!deletedProduct) {
      res.status(404).json(`No product found with ID ${pid}.`);
    } else {
      res.status(200).json("Product deleted successfully.");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = products;
