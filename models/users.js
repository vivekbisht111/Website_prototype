const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  cart: [],
});

//methods keyword is used when the function needs to be called from
//the instance of the particular schema
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id.toString(),
        username: this.username,
        cart: this.cart,
        email: this.email,
        role: "user",
      },
      process.env.secret_key
    );
    return token;
  } catch (err) {
    console.log("Error has occured:" + err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
