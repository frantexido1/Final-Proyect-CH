const express = require("express");
const app = express();
const socketIO = require("socket.io");
const handlebars = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Motor de plantillas Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

// Carpeta de archivos estáticos
app.use(express.static("../public"));

// Iniciar Servidor
const port = 8080;
const io = socketIO(
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  })
);

// Endpoints
const products = require("./routes/products/products");
const carts = require("./routes/cart/carts");

app.use("/api/products/", products);
app.use("/api/cart/", carts);

// Socket.io
