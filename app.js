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
const userProgressRoutes = require("./routes/userRoutes");
const updateMaterialStatusRoutes = require("./routes/viewMaterials");
const updateQuizStatusRoutes = require("./routes/authRoutes");
const forumThreadRoutes = require("./routes/threadRoutes");

// middleware and CORs enabled for all routes
app.use(express.json({limit: "50mb"}));
// app.use(cors());
app.use(cors({
    origin: ["http://localhost:6262", "https://brainboostapp-be.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resources", uploadMaterialRoutes);
app.use("/api/v1/quiz/manage", quizRoutes);
app.use("/api/v1/materials", fetchMaterialRoutes);
app.use("/api/v1/quiz/view", fetchQuizRoutes);
app.use("/api/v1/user", userProfileRoutes);
app.use("/api/v1/user", userProgressRoutes);
app.use("/api/v1/materials", updateMaterialStatusRoutes);
app.use("/api/v1/quiz", updateQuizStatusRoutes);
app.use("/api/v1/forum", forumThreadRoutes);

// Middleware testing
app.get("/api/v1/welcome", verifyToken, (req, res) => {
    res.status(200).send("Welcome to BrainBoost360!");
})



module.exports = app;