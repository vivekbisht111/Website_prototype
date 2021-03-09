const express = require(express);
const router = express.Router();
const {body,validationResult} = require('express-validator');
const User = require(../../models/users);

router.post('/api/login/user',body('email').isEmail(),async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()});
        }

        
    
    
    }
    catch(err)
    {
        console.log(err);
    }



})


module.exports = router;