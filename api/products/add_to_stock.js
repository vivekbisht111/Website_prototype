const express = require("express");
const router = express.Router();
const Products = require("../../models/product");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/", async (req, res) => {
  try {
    const ar = await Products.findOne({ category: req.body.category });
    var x = ar.products.findIndex((y) => y._id.toString() === req.body.p_id);
    // console.log(ar);
    ar.products[x].stock =
      parseInt(ar.products[x].stock) + parseInt(req.body.quantity);
    await ar.save();
    console.log(`Stock Updated ${ar.products[x]}`);
    res.redirect("products");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
