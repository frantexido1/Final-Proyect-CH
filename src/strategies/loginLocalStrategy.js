const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;
const userModel = require("../models/userModel");
const { isValidPassword } = require("../utils/passwordHash");
const { generateToken } = require("../utils/jwt");
const CustomError = require("../service/errors/customError");

const loginLocalStrategy = new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: "email",
    passwordField: "password",
  },
  async (req, email, password, done) => {
    try {
      let user = await userModel.findOne({ email });

      if (!user) {
        return done(null, false, { message: "Usuario no encontrado" });
      }

      if (!isValidPassword(password, user.password)) {
        return done(null, false, { message: "Contraseña incorrecta" });
      }

      user = user.toObject();
      delete user.password;

      const token = generateToken(user, "24h");
      req.session.user = token;

      done(null, user);
    } catch (error) {
      return done(
        CustomError({
          name: "Login Error",
          cause: error,
          message: "Error al iniciar sesión",
          code: EErrors.USER_LOGIN_ERROR,
        })
      );
    }
  }
);

module.exports = loginLocalStrategy;
