const passport = require("passport");
const registerLocalStrategy = require("../strategies/registerLocalStrategy");
const loginLocalStrategy = require("../strategies/loginLocalStrategy");
const userModel = require("../routes/Models/userModel");
const gitHubStrategy = require("../strategies/githubStrategy");

const initializePassport = () => {
  passport.use("register", registerLocalStrategy);
  passport.use("github", gitHubStrategy);
  passport.use("login", loginLocalStrategy);

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const user = await userModel.findOne({ email: email });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initializePassport;
