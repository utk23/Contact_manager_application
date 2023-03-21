const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
// @desc register the user
// @route Get/api/contacts/users/register
//@access public 
const registerUser = asyncHandler(async (req, resp) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        resp.status(400);
        throw new Error("all fields are mandatory");
    }
    const UserAvailable = await User.findOne({ email });
    if (UserAvailable) {
        resp.status(400);
        throw new Error("User already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const user = await User.create({
        username,
        email,
        password: hashPassword
    });
    console.log(`user created ${user}`);
    if (user) {
        resp.status(201).json({ _id: user.id, email: user.email });
    }
    else {
        resp.status(400);
        throw new Error("user data is not valid");
    }

    resp.json({ message: "Register the user" });
});

// @desc login the user
// @route Get/api/contacts/users/login
//@access public 
const loginUser = asyncHandler(async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(400);
        throw new Error("please fill email and password");
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
            process.env.ACCESS_TOKEN_SECERET,
            { expiresIn: "100m" }
        );

        resp.status(200).json({ accessToken });
    }
    else {
        resp.status(401);
        throw new Error("email or password is not valid");
    }

    // resp.json({ message: "login user" });
});

// @desc current information of the user
// @route Get/api/contacts/users/current
//@access public 
const currentUser = asyncHandler(async (req, resp) => {
    resp.json(req.user);
});



module.exports = { registerUser, loginUser, currentUser }