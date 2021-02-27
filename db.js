const mongoose = require('mongoose');

mongoose.connect('mongodb+srv:bishtbeast:bishtbeast@cluster0.jpqng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});
const connectDB = mongoose.connection;
connectDB.on('error', console.error.bind(console, 'connection error:'));
connectDB.once('open', function() {
  console.log("mongodb connected...");
});

module.exports = connectDB;
