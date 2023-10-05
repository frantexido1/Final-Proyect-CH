const passport = require("passport");

const loginJWTController = (req, res, next) => {
  passport.authenticate("login", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error de autenticación" });
    }
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    return res.redirect("/api/products");
  })(req, res, next);
};

const registerJWTController = (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error al Crear el usuario" });
    }
    if (!user) {
      return res.status(401).json({ message: "El usuario ya existe" });
    }

    return res.redirect("/login");
  })(req, res, next);
};
const recoveryPasswordController = async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({
      error: "El usuario no existe en el sistema",
    });
  }

  const newPassword = createHash(req.body.newPassword);
  await userModel.updateOne({ email: user.email }, { password: newPassword });

  return res.redirect("/login");
};

module.exports = {
  loginJWTController,
  registerJWTController,
  recoveryPasswordController,
};
