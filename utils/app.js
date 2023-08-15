const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(express.static("public"));


//MongoDB
const MONGODB_CONNECT =
  "mongodb+srv://admin:admin1234@cluster0.oizvoya.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_CONNECT)
  .then(() => console.log("conexion DB"))
  .catch((error) => console.log(error));
//


const PORT = 8080;
server.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);

io.on('connection', (socket) => {
  console.log('a user connected');
});

module.exports = {
  app,
  io,
};


