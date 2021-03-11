const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
    mID : Number,
    name : String,
    phone : Number,
});

const merchant = mongoose.model(Merchant,merchantSchema);

module.exports = merchant;