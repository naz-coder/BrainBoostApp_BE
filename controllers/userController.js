const User = require("../model/user");

exports.updateUserProgress = async(req, res) => {
    const {userId, updateData} = re.body;

    try{
        await User.findByIdAndUpdate(userId, {Spush: updateData});
        res.status(200).json({message: "User progress updated successfully"});
    }catch(error){
        res.status(500).json({error: "Error updating user progress", details: error});
    }
};

module.exports = updateUserProgress;