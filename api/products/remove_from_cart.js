const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  if (req.cookies.jwt) {
    const user = JWT.verify(req.cookies.jwt, process.env.secret_key);
    if (user) {
      const u = await User.findOne({ username: user.username });
    } else {
      res.send(200).send("Please log in first..");
    }
  } else {
    res.send(200).send("Please log in first..");
  }
});

module.exports = router;
