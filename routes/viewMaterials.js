const express = require("express");
const router = express.Router();
const TeachingMaterial = require("../model/TeachingMaterial");
const verifyToken = require("../middleware/authMiddleware");

// route to fetch learning materials for students
router.get("/view-materials", verifyToken, async(req, res) => {
    try{
        let materials;
        if(req.user.role === 'teacher'){
            // fetch materials specific to this teacher
            materials = await TeachingMaterial.find({teacher: req.user._id})
            .populate("teacher", "firstName lastName");
        }else if(req.user.role === 'student'){
            // fetch all materials available to students
            materials = await TeachingMaterial.find()
            .populate("teacher", "firstName lastName");
        }else{
            return res.status(403).json({error: "Unauthorised access"});
        }

        res.json(materials);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Failed to fetch materials"});
    }
});

module.exports = router;