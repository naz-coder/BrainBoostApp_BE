const mongoose = require("mongoose");

// Schema for user first time registeration
const userSchema = new mongoose.Schema({
    title:{type: String, default: null},
    firstName: {type: String, default: null},
    lastName: {type: String, default: null},
    email: {type: String, unique: true},
    password: {type: String},
    category: {type: String},
    subjects: {type: [String]},
    school: {type: String, default: null},
    grade: {type: String, default: null},
    position: {type: String, default: null},
    token: {type: String},
});

module.exports = mongoose.model("user", userSchema);