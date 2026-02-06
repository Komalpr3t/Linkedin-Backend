// write the business logic
const User = require("../models/user.model");
//import bcryptjs for password hashing
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//signup controller

// ->, async, await
//Store a user -> mongodb user model
// Server (index.js) -> mongodb server (to store a user)
const signup = async (req, res) => {
    try {
        //body/

        // req.body;
        /*
         {
        username : "abc",
        email : "abc@gmail.com",
        password : 123
        }
        */

        const { username, email, password } = req.body;

        //checking whether all fields are provided

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }


        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        console.log("err", err.message)
    }
}

//signin controller

const signin = async (req, res) => {
    //req -> request  (frontend)
    //res -> response (from backend to frontend)

    try {
        const { email, password } = req.body;

        // steps

        // step 1: check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist with this email" });
        }

        //step 2 : check if password matches

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: "Passwords don't match. Please try again!" })
        }

        //step 3 : generate a JWT token
        //create token data
        const tokenData = {
            id: user._id,

        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        console.log("Token: ", token)

        //store token as cookie

        res.cookie("access_token", token, { httpOnly: true });

        const loginTime = new Date(); // current date and current time
        user.lastLogin = loginTime;

        //abcdefghihjlmnopkomal + id -> unique token

        //step 4 : send response to frontend
        return res.status(200).json({ message: "User signed in successfully", user })

    } catch (err) {
        console.log("err", err.message)
    }
}

module.exports = { signup, signin };