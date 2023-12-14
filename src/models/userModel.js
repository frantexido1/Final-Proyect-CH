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
  last_connection: Date,
  cartID: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  documents: [{ name: String, reference: String }],
});

module.exports = mongoose.model("users", userSchema);
