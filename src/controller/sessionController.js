const passport = require("passport");
const emailSender = require("../utils/emailSender");
const userModel = require("../models/userModel");
const { generateToken, verifyToken } = require("../utils/jwt");
const { createHash } = require("../utils/passwordHash");

class AuthController {
  constructor() {
    this.emailSender = emailSender;
  }

  async loginJWT(req, res, next) {
    passport.authenticate("login", (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Error de autenticación" });
      }
      if (!user) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
      return res.redirect("/api/products");
    })(req, res, next);
  }

  async logout(req, res) {
    try {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.error(err);
          } else {
            res.redirect("/");
          }
        });
      }
    } catch (error) {}
  }

  async registerJWT(req, res, next) {
    passport.authenticate("register", { session: false }, (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Error al Crear el usuario" });
      }
      if (!user) {
        return res.status(401).json({ message: "El usuario ya existe" });
      }

      return res.redirect("/login");
    })(req, res, next);
  }

  async emailAddress(req, res) {
    try {
      let user = await userModel.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json({
          error: "El usuario no existe en el sistema",
        });
      }
      const token = generateToken({ email: req.body.email }, "1h");

      await this.emailSender.sendMail({
        to: user.email,
        subject: "Recuperación de contraseña",
        html: `<p>http://localhost:8080/api/sessions/recovery-password/${token}</p>`,
        attachments: [],
      });

      return res.redirect("/login");
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async recoveryPassword(req, res) {
    try {
      const token = req.params.token;

      const tokenPayload = verifyToken(token);
      if (!tokenPayload) {
        return res.status(401).json({ message: "Token inválido o expirado" });
      }
      const user = await userModel.findOne({ email: tokenPayload.email });
      const newPassword = createHash(req.body.password);
      user.password = newPassword;
      await user.save();

      return res.status(200).json({ message: "Contraseña cambiada con éxito" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

module.exports = AuthController;
