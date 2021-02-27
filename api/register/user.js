const express = require('express');
const app = express();
const router = express.Router();
const User = require('../../models/users');

router.post('/',async (req,res)=>{
    try{

        console.log(req.body.username);
        console.log(req.body.password);
        console.log(req.body.email);
        let u = new User({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email
        });
        
        await u.save();
        console.log(`user ${u.username} saved! `);
        res.send(`user ${u.username} saved! `);

    }
    catch(err){
        console.log(err);
    }
})

router.put('/add/:pname',async(req,res)=>{
    try{
        //if not already present add the product with pname as name to cart of currently logged in user

        
    }
    catch(err)
    {
        console.log(err);
    }
})

module.exports = router;
