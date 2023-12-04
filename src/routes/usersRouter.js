const express = require("express");
const UsersController = require("../controller/usersController");
const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.get("/", usersController.getUsers.bind(usersController));

usersRouter.get("/:param", usersController.getUser.bind(usersController));

usersRouter.put("/:id", usersController.updateUser.bind(usersController));

usersRouter.delete("/", usersController.deleteUser.bind(usersController));

usersRouter.put(
  "/premium/:uid",
  usersController.roleUser.bind(usersController)
);

module.exports = usersRouter;
