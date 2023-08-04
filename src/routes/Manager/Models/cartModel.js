const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  product: Array,
});

module.exports = mongoose.model("carts", cartSchema);
