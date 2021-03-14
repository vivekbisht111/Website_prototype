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
            console.log(req.body.category);
            console.log(req.body.quantity);
            console.log(req.body.p_id);
            const p = await Products.findOne({
              category: req.body.category,
            });
            console.log(p.products);
            const obj = p.products.findIndex(
              (x) => x._id.toString() === req.body.p_id
            );

            const num = req.body.quantity;
            var i;
            for (i = 0; i < num; i++) {
              p.products[obj].stock = p.products[obj].stock - 1;
            }

            console.log(p.products[obj].stock);
            await p.save();

            u.cart.push({
              pid: req.body.p_id,
              qty: req.body.quantity,
              category: req.body.category,
            });
            console.log("product added to cart");
            await u.save();
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
