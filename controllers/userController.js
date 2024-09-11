const User = require("../model/user");

exports.updateUserProgress = async(req, res) => {
    const userId = req.user._id;
    const {type, itemId} = req.body;        // type = 'quiz' or 'material', itemId = quiz or material ID

    try{
        let updateQuery = {};

        // Check if the update is for quizzes or materials and prepare the update query
        if(type === "Quiz"){
            updateQuery = {$push: {completedQuizzes: itemId}};
        }else if(type === "Study Material"){
            updateQuery = {$push: {completedMaterials: itemId}};
        }else if(type === "Revision Material"){
            updateQuery = {$push: {completedRevisionMaterials: itemId}};
        }else{
            return res.status(400).json({error: "Invalid type. Must be 'quiz' or 'material'." });
        }

        await User.findByIdAndUpdate(id, updateQuery);
        res.status(200).json({message: "User progress updated successfully"});
    }catch(error){
        res.status(500).json({error: "Error updating user progress", details: error});
    }
};