const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const Products = require("../../models/product");
const ccokieParser = require("cookie-parser");
const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");
const Merchant = require("../../models/merchant");
router.use(cookieParser());
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    if (req.cookies.jwt) {
      const user = JWT.verify(req.cookies.jwt, process.env.secret_key);
      if (user) {
        if (user.role === "merchant") {
          res.status(200).send("Please login as a User first...");
        } else {
          const u = await User.findOne({ username: user.username });
          if (u) {
            const indexcheck = u.cart.findIndex((x) => x.pid === req.body.p_id);
            if (indexcheck !== -1) {
              let num = req.body.quantity;
              var i;
              for (i = 0; i < num; i++) {
                u.cart[indexcheck].qty = u.cart[indexcheck].qty + 1;
              }
              await u.save();
              console.log("product added to cart");
            } else {
              u.cart.push({
                pid: req.body.p_id,
                qty: req.body.quantity,
                category: req.body.category,
              });
              console.log("product added to cart");
              await u.save();
            }

            // const p = await Products.findOne({
            //   category: req.body.category,
            // });
            // // console.log(p.products);
            // const obj = p.products.findIndex(
            //   (x) => x._id.toString() === req.body.p_id
            // );

            // const num = req.body.quantity;
            // var i;
            // for (i = 0; i < num; i++) {
            //   p.products[obj].stock = p.products[obj].stock - 1;
            // }

            // console.log(p.products[obj].stock);
            // await p.save();

            res.clearCookie("jwt");
            const token = await u.generateAuthToken();
            res.cookie("jwt", token, {
              expires: new Date(Date.now() + 120000),
              httpOnly: true,
            });
            res.redirect("/products");
          }
        }
      } else {
        res.status(200).send("Please login as a User first...");
      }
    } else {
      res.status(200).send("Please login as a User first...");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
