const express = require("express");
const router = express.Router();
const Users = require("../../models/users");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

router.use(express.json());
router.use(cookieParser());

router.post("/", body("username").isLength({ min: 3 }), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await Users.findOne({ username: req.body.username });
    console.log(user);
    if (user) {
      const val = await bcrypt.compare(req.body.password, user.password);
      if (val) {
        const token = await user.generateAuthToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 120000),
          httpOnly: true,
        });
        res.redirect("/");
      } else {
        res.send("incorrect details...");
      }
    } else {
      res.send("user not found");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
