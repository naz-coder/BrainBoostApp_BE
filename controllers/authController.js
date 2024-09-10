const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../middleware/tokenBlacklist");

// Regsiter
exports.register = async (req, res) =>{
    try{
        // Get user input
        const {title, firstName, lastName, email, password, role, subjects, school, grade, position} = req.body;

        // validate user input
        if(!(title && email && password && firstName && lastName && role && subjects && school && grade || position)){
            return res.status(400).send("All input is required");
        }

        const normalizedRole = role.toLowerCase();

        // validate if user exist in our db
        const oldUser = await User.findOne({email: email.toLowerCase()});
        if (oldUser){
            return res.status(409).send("User Already Exist. Please Login");
        }

        // Hash user password
        encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create user in our db
        const user = await User.create({
            title: title,
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
            role: normalizedRole,
            subjects: subjects, 
            school: school, 
            grade: grade,
            position: position
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
exports.login = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send("Email and Password are required");
        }

        // Normalize email and check if user exists in the database
        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });

        // Check if user exists
        if (!user) {
            return res.status(400).send("Invalid Credentials"); // No user found
        }

        // Check if the password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send("Invalid Credentials"); // Incorrect password
        }

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email: user.email, role: user.role },
            process.env.TOKEN_KEY,
            { expiresIn: "5h" }
        );

        // Save user token (consider if you really need to store the token in the database)
        user.token = token;
        await user.save();

        // Return user with token instead of password
        const { password: userPassword, ...userWithoutPassword } = user._doc;

        // Check user role and redirect accordingly
        if (user.role === "student") {
            return res.status(200).json({ ...userWithoutPassword, redirect: "/Student-Dashboard" });
        } else if (user.role === "teacher") {
            return res.status(200).json({ ...userWithoutPassword, redirect: "/Teacher-Dashboard" });
        } else {
            return res.status(403).send("Access denied. Invalid user role.");
        }
        
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};



// logout
exports.logout = async (req, res) => {
    try{
        const authHeader = req.headers['authorization'];
        if(!authHeader || !authHeader.startsWith('Bearer ')){
           return res.status(400).send({message: "Authorization token not provided or invalid format"}) ;
        }
        // Extract the token from the 'Bearer <token>' format
        const token = authHeader.split(' ')[1];
        TokenBlacklist.add({token});
        return res.status(200).send({message: "Logged out successfully!"});
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};