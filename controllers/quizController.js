const Quiz = require("../model/Quiz");

exports.quizStatus = async (req, res) => {
    const {quizId} = req.params;
    const userId = req.user._id;

    try{
        const quiz = await Quiz.findById(quizId);
        if(!quiz){
            return res.status(404).json({message: "Quiz not found"});
        }

        // Check if the teacher owns the material
        if(quiz.teacher.toString() !== userId){
            return res.status(403).json({message: "Unauthorized: You can only inactivate quiz you created"});
        }

        quiz.isActive = false;
        await quiz.save();
        res.status(200).json({message: "Quiz marked as inactive successfully!"});
    }catch(error){
        res.status(500).json({message: "Error marking quiz as inactive", error})
    }
}