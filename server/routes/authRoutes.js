const express = require("express");
const router = express.Router();
const {
    register,
    login
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/profile", protect, (req, res) => {

    res.json({
        success: true,
        message: "Protected Route Accessed",
        user: req.user
    });

});
const allowRoles = require("../middleware/roleMiddleware");
router.get(
    "/investor-dashboard",
    protect,
    allowRoles("investor"),
    (req,res)=>{

        res.json({
            success:true,
            message:"Welcome Investor Dashboard"
        });

    }
);



router.get(
    "/startup-dashboard",
    protect,
    allowRoles("startup"),
    (req,res)=>{

        res.json({
            success:true,
            message:"Welcome Startup Dashboard"
        });

    }
);

module.exports = router;