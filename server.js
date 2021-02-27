const express = require('express');
//const connectDB = require('./db.js');
const app = express();
const port  = 8080;
const path = require('path')
const mongoose = require('mongoose');


//initializing body parser
app.use(express.json({
	extended:false
}));

app.set('view engine','hbs');

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname+'/views/home.html'));
// })

app.get('/',(req,res)=>{
  res.render('home');
})

app.get('/register',(req,res)=>{
  res.render('register');
})

app.listen(port,()=>{
    console.log("server running...");
})

mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology: true});
const connectDB = mongoose.connection;
connectDB.on('error', console.error.bind(console, 'connection error:'));
connectDB.once('open', function() {
  console.log("mongodb connected...");
});

app.use('/api/register/user',require('./api/register/user'));
//app.use('api/register/trader',require('./api/register/trader'));


// mongouri mongodb+srv://bishtbeast:<password>@cluster0.jpqng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority