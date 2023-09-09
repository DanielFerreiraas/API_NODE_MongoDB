const express = require('express');

const UserModels = require('../models/User');

const router = express.Router();

router.post("/signup", async(req, res) => {

    const {email} = req.body;

    if(await UserModels.findOne({email})){
        return res.status(400).json({
            error: true,
            message: "User already exists"
        })
    }

    const User = await UserModels.create(req.body);
 
    User.password = undefined;

    return res.status(201).json({
        error: false,
        message:"register with sucess",
        data: User
    })
});

router.post("/signin", async(req, res) => {

    const {email, password} = req.body;

    const user = await UserModels.findOne({email});

    if(!user){
        return res.status(400).json({
            error: true,
            message: "user not found"
        })
    }
        return res.json(user);
});

module.exports = router;