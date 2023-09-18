const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  createDate: Date,
  isAdmin: Boolean,
  cartID: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
});

module.exports = mongoose.model("users", userSchema);
