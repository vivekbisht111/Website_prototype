const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Product = require("../../models/product");
// router.use(express.json());
router.post(
  "/",
  body("category").isLength({ min: 3 }),
  body("description").isLength({ max: 30 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(errors);
      }
      console.log(`the stock for product = ${req.body.stock}`);
      let p = await Product.findOne({ category: req.body.category });
      console.log(p);
      if (p) {
        console.log(`the category exists..${p}`);

        p.products.push({
          name: req.body.name,
          description: req.body.description,
          stock: req.body.stock,
        });
        //await Product.deleteMany({ category: req.body.category });
        await p.save();
        console.log(p);

        res.redirect("/");
      } else {
        p = new Product({
          category: req.body.category,
          products: [
            {
              name: req.body.name,
              description: req.body.description,
              stock: req.body.stock,
            },
          ],
        });

        await p.save();
        console.log(`product ${p} saved`);
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
