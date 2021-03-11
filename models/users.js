const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema =  new mongoose.Schema({
    username : String,
    password: String,
    email : String,
    cart:[],
});

//methods keyword is used when the function needs to be called from
//the instance of the particular schema
userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign(
            {_id:this._id.toString()},
            "thisisasecretkeyneedstobehidden"
        );
        return token;

    }
    catch(err)
    {
        console.log("Error has occured:"+err);
    }
}

const User = mongoose.model('User',userSchema);

module.exports = User;
