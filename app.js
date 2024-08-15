require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// importing user context
const User = require("./model/user");

// Regsiter
app.post("/api/v1/register", async (req, res) =>{
    // registeration logic
    try{
        // Get user input
        const {firstName, lastName, email, password} = req.body;

        // validate user input
        if(!(email && password && firstName && lastName)){
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // validate if user exist in our db
        const oldUser = await User.findOne({email});

        if (oldUser){
            return res.status(409).send("User Already Exist. Please Login");
        }

        // Encrypt user password
        encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create user in our db
        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
            password: encryptedUserPassword
        });

        // Create token
        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );
        // Save user token
        user.token = token;

        // Return new user
        res.status(201).json(user);
    }catch(err){
        console.log(err);
    }
});

// Login
app.post("/api/v1/login", (req, res) =>{
    // login logic here
    try{
        //Get user input
        const {email, password} = req.body;
    }catch(err){
       console.log(err); 
    }
});


module.exports = app;