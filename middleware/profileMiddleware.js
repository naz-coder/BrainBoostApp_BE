const User = require('../model/user');

const fetchUserProfile = async (req, res, next) => {
    try{
        // get userId from the authMiddleware
        const userId = req.user._id;

        // Fetch user profile with the necessary fields
        const user = await User.findById(userId).select(
            '_id title firstName lastName email role subjects school grade position completedQuizzes completedMaterials completedRevisionMaterials submittedQuizzes submittedMaterials totalTimeSpent'
        );
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        //Attach the user profile to the request
        req.userDetails = user;
        next();     // pass control to the next route handler i.e bcs there is more than one middleware functioning here
    }catch(error){
        return res.status(500).json({message: 'Server error', error: error.message});
    }
};

module.exports = fetchUserProfile;