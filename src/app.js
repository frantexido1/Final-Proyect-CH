const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const productsRouter = require("./routes/productsRouter");
const cartsRouter = require("./routes/cartsRouter");
const mongoose = require("mongoose");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGODB_CONNECT =
  "mongodb+srv://admin:admin1234@cluster0.oizvoya.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_CONNECT)
  .then(() => console.log("conexion DB"))
  .catch((error) => console.log(error));

// Motor de plantillas Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

// Endpoints
app.use("/api/products/", productsRouter);
app.use("/api/cart/", cartsRouter);

// Iniciar Servidor
const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
