const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: String,
  products: [
    {
      name: String,
      description: String,
      stock: Number,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
