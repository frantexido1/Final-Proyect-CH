const mongoose = require("mongoose");
const moongosePaginate = require("mongoose-paginate-v2");

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  code: {
    type: String,
    unique: true,
  },
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnail: Array,
});
productSchema.plugin(moongosePaginate);
module.exports = mongoose.model("products", productSchema);
