const express = require("express");
const app = express();
const router = express.Router();
const User = require("../../models/merchant");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

//app.use() won't work because the request is coming on the router's post function
//ig
router.use(cookieParser());

router.post(
  "/",
  body("username").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let u = new User({
        merchantname: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });

      const token = await u.generateAuthToken();
      console.log(token);
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 120000),
        httpOnly: true,
      });

      //console.log(`Cookie Data.. ${req.cookies.jwt}`);

      const salt = await bcrypt.genSalt(10);
      u.password = await bcrypt.hash(u.password, salt);

      await u.save();
      console.log(`user ${u.merchantname} saved! `);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
);

router.put("/add/:pname", async (req, res) => {
  try {
    //if not already present add the product with pname as name to cart of currently logged in user
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
