const mongoose = require("mongoose");

// Schema for teaching material
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
    uploadDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Quiz", quizSchema);