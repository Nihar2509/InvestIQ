const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Parse JSON request body
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Allow frontend requests
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

// Security headers
app.use(helmet());

// Development request logger
app.use(morgan("dev"));

// Parse cookies
app.use(cookieParser());

// Authentication routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 InvestIQ Backend Running Successfully"
    });
});

module.exports = app;