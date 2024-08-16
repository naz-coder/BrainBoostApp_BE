const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Regsiter
exports.register = async (req, res) =>{
    try{
        // Get user input
        const {firstName, lastName, email, password, category} = req.body;

        // validate user input
        if(!(email && password && firstName && lastName && category)){
            return res.status(400).send("All input is required");
        }

        const normalizedCategory = category.toLowerCase();

        // validate if user exist in our db
        const oldUser = await User.findOne({email: email.toLowerCase()});
        if (oldUser){
            return res.status(409).send("User Already Exist. Please Login");
        }

        // Encrypt/hash user password
        encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create user in our db
        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
            category: normalizedCategory,
        });

        // Create token
        const token = jwt.sign(
            {user_id: user._id, email: user.email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );
        // Save user token
        user.token = token;
        await user.save();

        // exclude the password from the response
        const {password: userPassword, ...userWithoutPassword} = user._doc;

        // Return new user
        return res.status(201).json(userWithoutPassword);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

// Login
exports.login = async (req, res) =>{
    try{
        //Get user input
        const {email, password} = req.body;

        // validate user input
        if(!(email && password)){
            return res.status(400).send("Email and Password is required");
        }

        // validate if user exist in our db
        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({email: normalizedEmail});
        console.log('User found:', user);

        // Check if user exists
        if(!user){
            return res.status(400).send("Invalid Credentials"); // I.e no user found
        }

        // check if the password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(isPasswordMatch){
            console.log('Password match:', isPasswordMatch);

            // create token
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY,
                {expiresIn: "5h"}
            );
            
            // save user token
            user.token = token;

            // save updated user wih token in the db
            await user.save();

            // return user with token insead of password
            const {password, ...userWithoutPassword} = user._doc;
            return res.status(200).json(userWithoutPassword);            
        }else{
            return res.status(400).send("Invalid Credentials");
        }
    }catch(err){
       console.error(err); 
       return res.status(500).send("Internal Server Error");
    }
};

