const express = require("express");
const sessionRouter = express.Router();
const passport = require("passport");
const { createHash } = require("../utils/passwordHash");
const {
  loginJWTController,
  registerJWTController,
} = require("../controller/userController");

sessionRouter.post("/register", registerJWTController);

sessionRouter.post("/login", loginJWTController);

sessionRouter.get("/current", passport.authenticate("jwt"), (req, res) => {
  return res.json({
    user: req.user,
    session: req.session,
  });
});

// sessionRouter.post("/recovery-password", async (req, res) => {
//   let user = await userModel.findOne({ email: req.body.email });

//   if (!user) {
//     return res.status(401).json({
//       error: "El usuario no existe en el sistema",
//     });
//   }

//   const newPassword = createHash(req.body.newPassword);
//   await userModel.updateOne({ email: user.email }, { password: newPassword });

//   return res.redirect("/login");
// });

module.exports = sessionRouter;
