const { Router } = require("express");
const { io } = require("../../utils/app");
const viewsRouter = new Router();

viewsRouter.get("/login", (req, res) => {
  return res.render("./chat/login");
});

viewsRouter.post("/login", async (req, res) => {
  const username = req.body.name;

  io.emit("newUser", username);

  return res.redirect(`/chat?username=${username}`);
});

viewsRouter.get("/chat", (req, res) => {
  return res.render("./chat/chat");
});

module.exports = viewsRouter;
