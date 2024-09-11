const express = require("express");
const router = express.Router();
const QuizContent = require("../model/Quiz");
const auth = require("../middleware/authMiddleware");
const updateTeacherSubmissions = require("../utils/updateTeacherSubmissions");


// Route to handle file upload
 router.post('/submit-quiz', auth, async(req, res) =>{
    const teacherId = req.user?._id;
    if(!teacherId){
        return res.status(400).json({error: "Teacher ID is missing"});
    }

    try{
        // save file metadata to MongoDB
        const newQuiz = new QuizContent({
            topic: req.body.topic,
            subject: req.body.subject,
            materialType: req.body.materialType,
            questions: req.body.questions,
            teacher: teacherId,
        });

        // Save the content to the db
        await newQuiz.save();
        await updateTeacherSubmissions(teacherId);
        res.status(201).json({message: "Quiz uploaded successfully", content: newQuiz});
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Quiz upload failed"});
    }
});

module.exports = router;
