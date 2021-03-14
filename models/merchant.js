const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const merchantSchema = new mongoose.Schema({
  merchantname: String,
  password: String,
  email: String,
  products: [],
  timestamp: { type: Date, default: Date.now },
});

//methods keyword is used when the function needs to be called from
//the instance of the particular schema
merchantSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id.toString(),
        merchantname: this.merchantname,
        products: this.products,
        email: this.email,
        role: "merchant",
      },
      process.env.secret_key
    );
    return token;
  } catch (err) {
    console.log("Error has occured:" + err);
  }
};

const Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;
