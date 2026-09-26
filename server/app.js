const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const startupRoutes = require("./routes/startupRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: " InvestIQ Backend Running Successfully"
    });
});

module.exports = app;