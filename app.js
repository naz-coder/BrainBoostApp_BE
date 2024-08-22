require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const verifyToken = require("./middleware/authMiddleware");
const cors = require("cors");
const app = express();

// import routes
const authRoutes = require("./routes/authRoutes");
const materialRoutes = require("./routes/materials");
// const userRoutes = require("./routes/userRoutes");

// middleware and CORs enabled for all routes
app.use(express.json({limit: "50mb"}));
app.use(cors());

// use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resources", materialRoutes);
// app.use("/api/users", userRoutes);

// Middleware testing
app.get("/api/v1/welcome", verifyToken, (req, res) => {
    res.status(200).send("Welcome to BrainBoost360!");
})



module.exports = app;