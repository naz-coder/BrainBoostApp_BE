const mongoose = require("mongoose");

// Schema for teaching material
const threadSchema = new mongoose.Schema({
    title:{type: String, required: true},
    content: {type: String, required: true},
    user: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now},
    comments: [{user: String, content: String, date:{type: Date, default: Date.now}}],
});

module.exports = mongoose.model("Thread", threadSchema);