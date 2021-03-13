const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
router.use(cookieParser);
router.use(express.json());
require("dotenv").config();
router.post("/", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const user = jwt.verify(token, process.env.secret_key);
      console.log(`the product to be added is ...${req.body}`);
    } else {
      res.redirect("login", { message: "Please login first" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
