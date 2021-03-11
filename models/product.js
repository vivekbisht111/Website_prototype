const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pID: Number,
    name : String,
    stock : Number,
});

const product = mongoose.model(Product,productSchema);

module.exports = product;