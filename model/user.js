const mongoose = require("mongoose");

// Schema for user first time registeration
const userSchema = new mongoose.Schema({
    title:{type: String, default: null},
    firstName: {type: String, default: null},
    lastName: {type: String, default: null},
    email: {type: String, unique: true},
    password: {type: String},
    role: {type: String, enum:["teacher", "student"], required: true},
    subjects: {type: [String]},
    school: {type: String, default: null},
    grade: {type: String, default: null},
    position: {type: String, default: null},
    token: {type: String},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("user", userSchema);