const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt=require('bcryptjs');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //Create new user
    const hashedPassword=await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        pic
    });

    //User created and send response
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: generateToken(user._id)
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

//ID to update the profile is coming from the token through the protect middleware
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name=req.body.name||user.name;
        user.email=req.body.email||user.email;
        if(req.body.password){
            const hashedPassword=await bcrypt.hash(req.body.password,10);
            user.password=hashedPassword;
        }
        user.pic=req.body.pic||user.pic;
        const updatedUser=await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            pic: updatedUser.pic,
            token: generateToken(updatedUser._id)
        })

    }else{
        res.status(404);
        throw new Error('User not found');
    }
});


module.exports = { registerUser, authUser, updateUserProfile }