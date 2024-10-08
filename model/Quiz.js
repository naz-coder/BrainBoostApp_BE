const mongoose = require("mongoose");

// Schema for quiz
const quizSchema = new mongoose.Schema({
    topic:{type: String, required: true},
    subject: {type: String, required: true},
    materialType: {type: String, default: "Quiz"},
    questions: [
        {
            question: {type: String, required: true}, 
            options: [{type: String, required: true}], 
            correctAnswer: {type: String, required: true}
        }
    ],
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    uploadDate: {type: Date, default: Date.now},
    isActive: {type: Boolean, default: true},
});

module.exports = mongoose.model("Quiz", quizSchema);