const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");
const Products = require("../../models/product");
const Users = require("../../models/users");
require("dotenv").config();
router.use(cookieParser());

router.get("/", async (req, res) => {
  try {
    const u = JWT.verify(req.cookies.jwt, process.env.secret_key);
    const user = await Users.findOne({ username: u.username });
    if (user) {
      var i;
      for (i = 0; i < user.cart.length; i++) {
        var j;
        const ar = await Products.findOne({ category: user.cart[i].category });
        for (j = 0; j < ar.products.length; j++) {
          if (user.cart[i].pid === ar.products[j]._id.toString()) {
            if (user.cart[i].qty > ar.products[j].stock) {
              return res.send(
                `Item : ${ar.products[j].name} from your cart is out of Stock...`
              );
            }
          }
        }
      }
      for (i = 0; i < user.cart.length; i++) {
        var j;
        const ar = await Products.findOne({ category: user.cart[i].category });
        for (j = 0; j < ar.products.length; j++) {
          if (user.cart[i].pid === ar.products[j]._id.toString()) {
            // console.log(` before placing order ${ar}`);
            if (user.cart[i].qty <= ar.products[j].stock) {
              ar.products[j].stock = ar.products[j].stock - user.cart[i].qty;
            }
          }
        }

        await ar.save();
      }
      user.cart.splice(0, user.cart.length);
      await user.save();
      res.clearCookie("jwt");
      const token = await user.generateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 120000),
        httpOnly: true,
      });

      // console.log(p.products[obj].stock);

      res.redirect("/");
    } else {
      res.status(200).JSON({ msg: "Please Login Again..." });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
