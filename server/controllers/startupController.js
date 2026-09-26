const startupModel = require("../models/startupModel");

// ==========================================
// CREATE STARTUP
// ==========================================

const createStartup = async (req, res) => {
    try {
        const founderId = req.user.id;

        const existingStartup =
            await startupModel.getStartupByFounder(founderId);

        if (existingStartup) {
            return res.status(400).json({
                success: false,
                message: "You already have a startup."
            });
        }

        if (!req.body.name || !req.body.name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Startup name is required."
            });
        }

        const startup = await startupModel.createStartup(
            founderId,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Startup created successfully.",
            data: startup
        });

    } catch (error) {
        console.error("Create startup error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create startup."
        });
    }
};

// ==========================================
// GET LOGGED-IN FOUNDER'S STARTUP
// ==========================================

const getMyStartup = async (req, res) => {
    try {
        const founderId = req.user.id;

        const startup =
            await startupModel.getStartupByFounder(founderId);

        if (!startup) {
            return res.status(404).json({
                success: false,
                message: "Startup not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: startup
        });

    } catch (error) {
        console.error("Get my startup error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get startup."
        });
    }
};

// ==========================================
// UPDATE LOGGED-IN FOUNDER'S STARTUP
// ==========================================

const updateMyStartup = async (req, res) => {
    try {
        const founderId = req.user.id;

        const startup = await startupModel.updateStartup(
            founderId,
            req.body
        );

        if (!startup) {
            return res.status(404).json({
                success: false,
                message: "Startup not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Startup updated successfully.",
            data: startup
        });

    } catch (error) {
        console.error("Update startup error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update startup."
        });
    }
};

// ==========================================
// PUBLISH STARTUP
// ==========================================

const publishMyStartup = async (req, res) => {
    try {
        const founderId = req.user.id;

        const startup =
            await startupModel.publishStartup(founderId);

        if (!startup) {
            return res.status(404).json({
                success: false,
                message: "Startup not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Startup published successfully.",
            data: startup
        });

    } catch (error) {
        console.error("Publish startup error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to publish startup."
        });
    }
};

// ==========================================
// PAUSE STARTUP
// ==========================================

const pauseMyStartup = async (req, res) => {
    try {
        const founderId = req.user.id;

        const startup =
            await startupModel.pauseStartup(founderId);

        if (!startup) {
            return res.status(404).json({
                success: false,
                message: "Startup not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Startup paused successfully.",
            data: startup
        });

    } catch (error) {
        console.error("Pause startup error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to pause startup."
        });
    }
};

// ==========================================
// GET STARTUP BY ID
// ==========================================

const getStartup = async (req, res) => {
    try {
        const startupId = req.params.id;

        console.log("Requested startup ID:", startupId);

        const startup =
            await startupModel.getStartupById(startupId);

        console.log("Startup returned from database:", startup);

        if (!startup) {
            return res.status(404).json({
                success: false,
                message: "Startup not found."
            });
        }

        const isOwner =
            Number(req.user.id) === Number(startup.founder_id);

        if (startup.status !== "PUBLISHED" && !isOwner) {
            return res.status(403).json({
                success: false,
                message: "You do not have access to this startup."
            });
        }

        return res.status(200).json({
            success: true,
            data: startup
        });

    } catch (error) {
        console.error("Get startup error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get startup."
        });
    }
};

// ==========================================
// GET ALL PUBLISHED STARTUPS
// INVESTOR MARKETPLACE
// ==========================================

const getAllStartups = async (req, res) => {
    try {
        const startups =
            await startupModel.getAllPublishedStartups();

        return res.status(200).json({
            success: true,
            data: startups
        });

    } catch (error) {
        console.error("Get all startups error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get startups."
        });
    }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
    createStartup,
    getMyStartup,
    updateMyStartup,
    publishMyStartup,
    pauseMyStartup,
    getStartup,
    getAllStartups
};