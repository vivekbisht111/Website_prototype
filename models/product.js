const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: String,
  products: [
    {
      name: String,
      description: String,
      stock: Number,
    },
  ],
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
