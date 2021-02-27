const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name : String,
    password: String,
    cart:[],
});

const User = mongoose.model('User',userSchema);

module.exports = User;
