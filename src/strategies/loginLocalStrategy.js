const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;
const userModel = require("../storage/Models/userModel");
const { isValidPassword } = require("../utils/passwordHash");

const loginLocalStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      let user = await userModel.findOne({ email: email });

      if (!user) {
        return done(
          null,
          console.log({
            message: "El usuario no existe en el sistema",
          })
        );
      }

      if (!isValidPassword(password, user.password)) {
        return done(null, console.log({ message: "Datos incorrectos" }));
      }

      delete user.password;
      done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = loginLocalStrategy;
