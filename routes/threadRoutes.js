const express = require("express");
const Thread = require("../model/Thread");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/threads", async(req, res) => {
    try{
        const threads = await Thread.find();
        res.json(threads);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/threads', verifyToken, async (req, res) => {
    try{
        const {title, content} = req.body;
        const thread = await Thread({
            title, 
            content, 
            user: req.user._id,
            userName: req.user.userName,
        });
        await thread.save();
        res.json(thread);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/threads/:id/comments', verifyToken, async (req, res) => {
    try{
        const {content} = req.body;
        const thread = await Thread.findById(req.params.id);
        
        if(!thread) return res.status(404).json({message: "Thread not found!"});
        thread.comments.push({
            content, 
            user: req.user._id,
            userName: req.user.userName,
        });
        await thread.save();
        res.json(thread);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;