const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;
const userModel = require("../storage/Models/userModel");
const { createHash } = require("../utils/passwordHash");
const CartService = require("../service/cartService");
const cartService = new CartService();

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

      user.password = createHash(user.password);
      user.role = "admin";
      const cart = await cartService.createCart();
      user.cartID = cart._id;
      await userModel.create(user);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
module.exports = registerLocalStrategy;
