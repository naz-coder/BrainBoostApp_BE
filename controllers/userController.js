const User = require("../model/user");

exports.updateUserProgress = async(req, res) => {
    const {id} = req.params;
    const {updateData} = req.body;

    try{
        await User.findByIdAndUpdate(id, {Spush: updateData});
        res.status(200).json({message: "User progress updated successfully"});
    }catch(error){
        res.status(500).json({error: "Error updating user progress", details: error});
    }
};