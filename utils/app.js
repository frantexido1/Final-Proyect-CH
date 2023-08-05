const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(express.static("public"));

//Socket.io
const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
const io = new Server(httpServer);

//MongoDB
const MONGODB_CONNECT =
  "mongodb+srv://admin:admin1234@cluster0.oizvoya.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_CONNECT)
  .then(() => console.log("conexion DB"))
  .catch((error) => console.log(error));
//

module.exports = {
  app,
  io,
};
