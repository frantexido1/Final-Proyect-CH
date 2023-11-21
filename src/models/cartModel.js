const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  products: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number },
    },
  ],
  purchased: { type: Boolean, default: false },
});

module.exports = mongoose.model("carts", cartSchema);
