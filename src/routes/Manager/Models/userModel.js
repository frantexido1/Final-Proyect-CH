const { Schema, model } = require("mongoose");

const userSchema = Schema({
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
});

module.exports = model("users", userSchema);
