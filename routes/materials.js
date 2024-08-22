const express = require("express");
const router = express.Router();
const TeachingMaterial = require("../model/TeachingMaterial");

// route to fetch learning materials for students
router.get("/materials", async(req, res) => {
    try{
        const materials = await TeachingMaterial.find().populate("teacher", "firstName lastName");
        res.json(materials);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Failed to fetch materials"});
    }
});

module.exports = router;