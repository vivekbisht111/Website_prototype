const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
});

const product = mongoose.model(Product, productSchema);

module.exports = product;
