const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const fetchUserProfile = require("../middleware/profileMiddleware");

// route to fetch user profile
router.get("/user-profile", verifyToken, fetchUserProfile, (req, res) => {
    const user = req.userDetails;       // fetch user details from the db
    // console.log(user);
    res.json({
        id: user._id, 
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        subjects: user.subjects, 
        school: user.school, 
        grade: user.grade,
        position: user.position,
        completedQuizzes: user.completedQuizzes,
        completedMaterials: user.completedMaterials,
        completedRevisionMaterials: user.completedRevisionMaterials,
        submittedQuizzes: user.submittedQuizzes,
        submittedMaterials: user.submittedMaterials,
    });
});

module.exports = router;