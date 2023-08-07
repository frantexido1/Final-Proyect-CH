const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const chatModel = require("../src/routes/Manager/Models/chatModel");
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

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("joinChat", async (username) => {
    try {
      const existingUser = await chatModel.findOne({ "users.name": username });

      if (existingUser) {
        existingUser.users.forEach((user) => {
          if (user.name === username) {
            user.socketId = socket.id;
          }
        });

        await existingUser.save();
      } else {
        const user = { name: username, socketId: socket.id };

        await chatModel.findOneAndUpdate(
          {},
          { $addToSet: { users: user } },
          { upsert: true }
        );
      }

      const chat = await chatModel.findOne({ "users.name": username });

      socket.broadcast.emit("notification", `${username} se ha unido al chat`);
      socket.emit("notification", `Bienvenid@ ${username}`);
      socket.emit("messages", JSON.stringify(chat.messages));
    } catch (error) {
      console.error("Error al unirse al chat:", error);
    }
  });

  socket.on("newMessage", async (message) => {
    try {
      const user = await chatModel.findOne({ "users.socketId": socket.id });
      if (!user) return;

      const newMessage = {
        message,
        user: user.users.find((u) => u.socketId === socket.id).name,
      };

      await chatModel.updateOne(
        { _id: user._id },
        { $push: { messages: newMessage } }
      );

      io.emit("message", JSON.stringify(newMessage));
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  });
});

module.exports = {
  app,
  io,
};
