const express = require("express");
const ProductManager = require("./Manager/MongoDB/productManager");
const productManager = new ProductManager();
const products = express.Router();

products.get("/", async (req, res) => {
  try {
    const filters = {
      limit: req.query.limit || 10,
      page: parseInt(req.query.page) || 1,
      query: req.query.query || "{}",
    };

    if (req.query.sort) {
      filters.sort = req.query.sort === "desc" ? { price: -1 } : { price: 1 };
    }

    const products = await productManager.getProducts(filters);
    return res.render("productList", products);
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
    let body = req.body;
    body.status = body.status === "on" ? true : false;
    productManager.addProduct(body);
    return res.status(201).redirect("/");
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
