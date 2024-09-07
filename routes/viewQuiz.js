const express = require("express");
const router = express.Router();
const TestQuiz = require("../model/Quiz");
const verifyToken = require("../middleware/authMiddleware");

// route to fetch learning materials for students
router.get("/view-quiz", verifyToken, async(req, res) => {
    try{
        let quizzes;
        if(req.user.role === 'teacher'){
            // fetch quiz specific to this teacher
            quizzes = await TestQuiz.find({teacher: req.user._id})
            .populate("teacher", "firstName lastName");
        }else if(req.user.role === 'student'){
            // fetch all quiz available to students
            quizzes = await TestQuiz.find()
            .populate("teacher", "firstName lastName");
        }else{
            return res.status(403).json({error: "Unauthorised access"});
        }

        res.json(quizzes);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Failed to fetch quiz"});
    }
});

module.exports = router;