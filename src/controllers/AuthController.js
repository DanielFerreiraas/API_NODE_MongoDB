const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSecret = require("../config/enviroment.json");

const UserModels = require('../models/User');

const router = express.Router();

const generateToken = (user = {}) => {
    return jwt.sign({
        id: user.id
    },  authSecret.secret, {
        expiresIn: 86400
    });
}

router.post("/signup", async(req, res) => {

    const {email} = req.body;
    const isEmail = await UserModels.findOne({email});

    if(isEmail){
        return res.status(400).json({
            error: true,
            message:"this email already exists"
        })
    }

    const user = await UserModels.create(req.body);
 
    user.password = undefined;

    return res.status(201).json({
        user,
        token: generateToken(user)
    });
});

router.post("/signin", async(req, res) => {

    const {email, password} = req.body;
    const user = await UserModels.findOne({email}).select("+password");

    if(!user || !await bcrypt.compare(password, user.password)){
        return res.status(400).json({
            error: true,
            message:"Email or Password doesn't match",
        })
    }
        user.password = undefined;
        
        return res.json({
            token: generateToken(user)
        });
});

module.exports = router;