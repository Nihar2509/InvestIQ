const express = require("express");

const router = express.Router();

const {
    createStartup,
    getMyStartup,
    updateMyStartup,
    publishMyStartup,
    pauseMyStartup,
    getStartup,
    getAllStartups
} = require("../controllers/startupController");

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");


// ==========================================
// FOUNDER STARTUP ROUTES
// ==========================================

// Create startup
router.post(
    "/",
    authMiddleware,
    allowRoles("startup"),
    createStartup
);

// Get logged-in founder's startup
router.get(
    "/me",
    authMiddleware,
    allowRoles("startup"),
    getMyStartup
);

// Update logged-in founder's startup
router.put(
    "/me",
    authMiddleware,
    allowRoles("startup"),
    updateMyStartup
);

// Publish startup
router.post(
    "/me/publish",
    authMiddleware,
    allowRoles("startup"),
    publishMyStartup
);

// Pause startup
router.post(
    "/me/pause",
    authMiddleware,
    allowRoles("startup"),
    pauseMyStartup
);


// ==========================================
// INVESTOR MARKETPLACE
// ==========================================

// Get all published startups
router.get(
    "/",
    authMiddleware,
    allowRoles("investor"),
    getAllStartups
);


// ==========================================
// STARTUP DETAILS
// ==========================================

// Get startup by ID
router.get(
    "/:id",
    authMiddleware,
    getStartup
);


module.exports = router;