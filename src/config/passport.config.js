const passport = require("passport");
const passportLocal = require("passport-local");
const userModel = require("../routes/Manager/Models/userModel");
const { createHash, isValidPassword } = require("../utils/passwordHash");

const LocalStrategy = passportLocal.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          if (await userModel.findOne({ email: username })) {
            console.log("Usuario ya existe");
            return done(null, false);
          }

          const user = req.body;

          user.createDate = new Date();

          user.isAdmin = user.isAdmin === "on" ? true : false;

          user.password = createHash(user.password);

          await userModel.create(user);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          let user = await userModel.findOne({ email: email });

          if (!user) {
            return done(null, false, {
              message: "El usuario no existe en el sistema",
            });
          }

          if (!isValidPassword(password, user.password)) {
            return done(null, false, { message: "Datos incorrectos" });
          }
          user = user.toObject();

          delete user.password;

          done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initializePassport;
