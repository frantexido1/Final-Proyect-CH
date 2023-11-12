const passport = require("passport");
const passportJWT = require("passport-jwt");
const registerLocalStrategy = require("../strategies/registerLocalStrategy");
const loginLocalStrategy = require("../strategies/loginLocalStrategy");
const userModel = require("../storage/Models/userModel");
const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

const tokenFromRequest = (req) => {
  return req.session.user;
};

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: extractJWT.fromExtractors([tokenFromRequest]),
        secretOrKey: "jwtsecret",
      },
      (jwtPayload, done) => {
        done(null, jwtPayload);
      }
    )
  );

  passport.use("register", registerLocalStrategy);
  passport.use("login", loginLocalStrategy);

  passport.serializeUser((user, done) => {
    return done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    const user = await userModel.findOne({ email });
    return done(null, user);
  });
};
module.exports = initializePassport;
