const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;
const userModel = require("../routes/Models/userModel");
const { createHash } = require("../utils/passwordHash");

const registerLocalStrategy = new LocalStrategy(
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
);
module.exports = registerLocalStrategy;
