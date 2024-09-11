const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

router.put("/progress", verifyToken, userController.updateUserProgress);

module.exports = router;