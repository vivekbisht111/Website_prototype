const express = require('express');
const app = express();
const router = express.Router();
const User = require('../../models/users');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

router.post('/',body('username').isLength({min:3}),body('email').isEmail()
,body('password').isLength({min:3}),async (req,res)=>{
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()});
        }
        // console.log(req.body.username);
        // console.log(req.body.password);
        // console.log(req.body.email);



        let u = new User({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email
        });
        
        const salt = await bcrypt.genSalt(10);
        u.password = await bcrypt.hash(u.password,salt);

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
