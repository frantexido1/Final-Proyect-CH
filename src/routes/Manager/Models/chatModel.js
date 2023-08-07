const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  users: Array,
  messages: Array,
});

module.exports = mongoose.model("chat", chatSchema);
