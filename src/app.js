const express = require("express");
const app = express();
app.use(express.static("../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = require("./routes/products/products");
const carts = require("./routes/cart/carts");

app.use("/api/products/", products);

app.use("/api/cart/", carts);

const port = 8080;
app.listen(8080, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
