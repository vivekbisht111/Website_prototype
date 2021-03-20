const express = require("express");
//const connectDB = require('./db.js');
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const exhbs = require("express-handlebars");
const User = require("./models/users");
const Products = require("./models/product");
require("dotenv").config();
var bodyParser = require("body-parser");
const { mainModule } = require("process");
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());

/*const hbs = exhbs.create({
  layoutsDir: path.join(__dirname + "views/mainLayout"),
  partialsDir: path.join(__dirname + "views/partials"),
  extname: ".hbs",
});*/

app.engine(
  ".hbs",
  exhbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  if (req.cookies.jwt) {
    const active_user = jwt.verify(req.cookies.jwt, process.env.secret_key);
    console.log(`the active user is...${JSON.stringify(active_user)}`);
    if (active_user) {
      if (active_user.role === "user") {
        res.render("home", {
          username: active_user.username,
        });
      } else {
        res.render("home", {
          merchantname: active_user.merchantname,
        });
      }
    }
  } else {
    console.log("at home page..");
    res.render("home");
  }
});

app.get("/register", (req, res) => {
  res.render("register/register");
});

app.get("/add_product", (req, res) => {
  res.render("products/add_product");
});

app.get("/cart", (req, res) => {
  if (req.cookies.jwt) {
    const active_user = jwt.verify(req.cookies.jwt, process.env.secret_key);
    // console.log(`the active user is...${JSON.stringify(active_user)}`);
    if (active_user) {
      res.render("cart/user_cart", {
        cart: active_user.cart,
      });
    }
  } else
    res.render("home", {
      message: "Please log in first...",
    });
});

app.get("/products", async (req, res) => {
  try {
    Products.find({}).then((products) => {
      if (req.cookies.jwt) {
        const active_user = jwt.verify(req.cookies.jwt, process.env.secret_key);
        console.log(`the active user is...${JSON.stringify(active_user)}`);
        if (active_user) {
          if (active_user.role === "user") {
            res.render("products/products", {
              //individual objects need to be parsed as json...
              p: products.map((product) => product.toJSON()),
            });
          } else {
            res.render("products/products", {
              //individual objects need to be parsed as json...
              p: products.map((product) => product.toJSON()),
              m: true,
            });
          }
        } else {
          res.render("products/products", {
            //individual objects need to be parsed as json...
            p: products.map((product) => product.toJSON()),
          });
        }
      } else {
        res.render("products/products", {
          //individual objects need to be parsed as json...
          p: products.map((product) => product.toJSON()),
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/secret", (req, res) => {
  console.log(`The cookie at secret page :${req.cookies.jwt}`);
  res.send(req.cookies.jwt);
});

app.get("/login", (req, res) => {
  res.render("login/login");
});

app.listen(port, () => {
  console.log("server running...");
});

mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connectDB = mongoose.connection;
connectDB.on("error", console.error.bind(console, "connection error:"));
connectDB.once("open", function () {
  console.log("mongodb connected...");
});

app.use("/api/register/user", require("./api/register/user"));
app.use("/api/register/merchant", require("./api/register/merchant"));
app.use("/api/login/user", require("./api/login/user"));
app.use("/api/login/merchant", require("./api/login/merchant"));
app.use("/logout", require("./api/logout"));
app.use("/api/products/add_product", require("./api/products/add_product"));
app.use("/add_to_cart", require("./api/products/add_to_cart.js"));
app.use("/remove_from_cart", require("./api/products/remove_from_cart"));
app.use("/place_order", require("./api/products/place_order"));
app.use("/add_to_stock", require("./api/products/add_to_stock"));
//app.use('api/register/trader',require('./api/register/trader'));

// mongouri mongodb+srv://bishtbeast:<password>@cluster0.jpqng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
