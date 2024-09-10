require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const verifyToken = require("./middleware/authMiddleware");
const cors = require("cors");
const app = express();

// import routes
const authRoutes = require("./routes/authRoutes");
const uploadMaterialRoutes = require("./routes/teacherFileMgt");
const quizRoutes = require("./routes/teacherQuizMgt");
const fetchMaterialRoutes = require("./routes/viewMaterials");
const fetchQuizRoutes = require("./routes/viewQuiz");
const userProfileRoutes = require("./routes/userProfile");

// middleware and CORs enabled for all routes
app.use(express.json({limit: "50mb"}));
app.use(cors());

// use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resources", uploadMaterialRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/materials", fetchMaterialRoutes);
app.use("/api/v1/quiz", fetchQuizRoutes);
app.use("/api/v1/user", userProfileRoutes);

// Middleware testing
app.get("/api/v1/welcome", verifyToken, (req, res) => {
    res.status(200).send("Welcome to BrainBoost360!");
})



module.exports = app;