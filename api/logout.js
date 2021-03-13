const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/", async (req, res) => {
  try {
    if (req.cookies.jwt) res.clearCookie("jwt");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
