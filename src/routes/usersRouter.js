const express = require("express");
const UsersController = require("../controller/usersController");
const upload = require("../middlewares/multer");
const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.get("/", usersController.getUsers.bind(usersController));

usersRouter.get("/:value", usersController.getUser.bind(usersController));

usersRouter.put("/:uid", usersController.updateUser.bind(usersController));

usersRouter.delete("/", usersController.deleteUser.bind(usersController));

usersRouter.put(
  "/premium/:uid",
  usersController.roleUser.bind(usersController)
);

usersRouter.post("/:uid/documents", upload.array("files"));

usersRouter.delete(
  "/deleteInactiveUsers",
  usersController.deleteInactiveUsers.bind(usersController)
);

module.exports = usersRouter;
