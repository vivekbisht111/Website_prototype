const express = require("express");
//const connectDB = require('./db.js');
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/users");
require("dotenv").config();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.set("view engine", "hbs");

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname+'/views/home.html'));
// })

app.get("/", (req, res) => {
  if (req.cookies.jwt) {
    const active_user = jwt.verify(req.cookies.jwt, process.env.secret_key);
    // console.log(`the active user is...${JSON.stringify(active_user)}`);
    if (active_user) {
      res.render("home", {
        username: active_user.username,
      });
    }
  } else res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register/register");
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
app.use("/api/login/user", require("./api/login/user"));
//app.use('api/register/trader',require('./api/register/trader'));

// mongouri mongodb+srv://bishtbeast:<password>@cluster0.jpqng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
