const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

module.exports = mongoose.model("carts", cartSchema);
