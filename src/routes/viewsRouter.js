const { Router } = require("express");
const { io } = require("../../utils/app");
const viewsRouter = new Router();

const usersModels = require("../routes/Manager/Models/usersModels");

viewsRouter.get("/login", (req, res) => {
  return res.render("./chat/login");
});

viewsRouter.post("/login", async (req, res) => {
  const user = req.body;

  const username = await usersModels.create({ user });

  console.log({ username });
  io.emit("newUser", username);

  return res.redirect(`/chat?username=${username}`);
});

viewsRouter.get("/chat", (req, res) => {
  return res.render("./chat/chat");
});

module.exports = viewsRouter;
