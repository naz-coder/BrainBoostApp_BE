const mongoose = require("mongoose");

// Schema for teaching material
const quizSchema = new mongoose.Schema({
    materialId:{type: mongoose.Schema.Types.ObjectId, ref: "TeachingMaterial", required: true},
    questions: {question: String, options: [String], correctAnswer: String},
    uploadDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Quiz", quizSchema);