const express = require('express');
const app = express();
const router = express.Router();
const User = require('../../models/users');

router.post('/',async (req,res)=>{
    try{
        let u = new User({
            username : req.body.name,
            password : req.body.password,
        });

        await u.save();
        console.log(`user ${u.name} saved! `);
        res.send(`user ${u.name} saved! `);

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
