const express = require("express");
const router = express.Router();

const {
    createStartup,
    getMyStartup,
    updateMyStartup,
    publishMyStartup,
    pauseMyStartup,
    getStartup
} = require("../controllers/startupController");

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

router.post(
    "/",
    authMiddleware,
    allowRoles("startup"),
    createStartup
);

router.get(
    "/me",
    authMiddleware,
    allowRoles("startup"),
    getMyStartup
);

router.put(
    "/me",
    authMiddleware,
    allowRoles("startup"),
    updateMyStartup
);

router.post(
    "/me/publish",
    authMiddleware,
    allowRoles("startup"),
    publishMyStartup
);

router.post(
    "/me/pause",
    authMiddleware,
    allowRoles("startup"),
    pauseMyStartup
);

router.get(
    "/:id",
    authMiddleware,
    getStartup
);

module.exports = router;