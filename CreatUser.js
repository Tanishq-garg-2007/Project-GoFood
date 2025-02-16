const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "qwertyuiopasdfghjklzxcvbnm"

router.post("/creatuser",
    [body('email').isEmail(),body('password','Password Must Be Greater Than Of Length 3').isLength({min:5}),body('name').isLength({min:3})]
    ,async (req,res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secpassword = await bcrypt.hash(req.body.password,salt)
    try {
         
        await User.create({
            name: req.body.name,
            password: secpassword,
            location: req.body.location,
            email: req.body.email
        }).then(() => res.json({ success: true }));
        

    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
}) 


router.post("/loginuser",
    [body('email').isEmail(),body('password','Password Must Be Greater Than Of Length 3').isLength({min:5})]

    ,async (req,res)=>{
    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() });
        }

    try {

        let userData = await User.findOne({ email: req.body.email });
        if(!userData){
            return res.status(400).json({errors:"You Don't Have An Account"});
        }
        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare){
            return res.status(400).json({errors:"Incorrect Password"});
        }
        
        const data = {
            user:{
                id:userData.id
            }
        }

        const authToken = jwt.sign(data,jwtsecret);
        return res.json({success:true,authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
}) 


module.exports = router;
