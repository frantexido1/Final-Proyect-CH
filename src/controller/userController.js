const passport = require("passport");

const loginJWTController = (req, res, next) => {
  passport.authenticate("login", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error de autenticación" });
    }
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = user.access_token;
    console.log(token);
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

module.exports = { loginJWTController, registerJWTController };
