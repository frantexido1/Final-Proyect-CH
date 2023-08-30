const express = require("express");
const sessionRouter = express.Router();
const userModel = require("./Manager/Models/userModel");
const { createHash, isValidPassword } = require("../utils/passwordHash");

sessionRouter.post("/register", async (req, res) => {
  try {
    const user = req.body;
    user.createDate = new Date();
    user.isAdmin = user.isAdmin === "on" ? true : false;
    user.password = createHash(user.password);
    await userModel.create(user);
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

sessionRouter.post("/login", async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        error: "El usuario no existe en el sistema",
      });
    }

    if (!isValidPassword((req.body.password, user.password))) {
      return res.status(401).json({
        error: "Datos incorrectos",
      });
    }
    req.session.user = user.toObject();

    return res.redirect("/api/products");
  } catch (error) {
    console.log(error);
  }
});

module.exports = sessionRouter;
