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
  role: String,
  cartID: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  last_connection: Date,
  documents: [{ name: String, reference: String }],
});

module.exports = mongoose.model("users", userSchema);
