const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../../models/users");
const JWT = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/", async (req, res) => {
  if (req.cookies.jwt) {
    const user = JWT.verify(req.cookies.jwt, process.env.secret_key);
    if (user) {
      const u = await User.findOne({ username: user.username });
      if (u) {
        const i = u.cart.findIndex((x) => x.pid.toString() === req.body.pid);
        console.log(i);
        console.log(`user before removing from cart${u}`);
        var x = u.cart.splice(i, 1);
        console.log(`user after removing from cart${u}`);
        await u.save();
        res.clearCookie("jwt");
        const token = await u.generateAuthToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 120000),
          httpOnly: true,
        });

        res.redirect("cart");
      }
    } else {
      res.send(200).send("Please log in first..");
    }
  } else {
    res.send(200).send("Please log in first..");
  }
});

module.exports = router;
