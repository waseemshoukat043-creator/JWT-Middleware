const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// PRIVATE PROFILE
// ========================================

router.get(
    "/profile",
    authMiddleware,
    (req, res) => {

        res.json({
            message: "Welcome to your private profile!",
            user: req.user
        });

    }
);

// ========================================
// PRIVATE DASHBOARD
// ========================================

router.get(
    "/dashboard",
    authMiddleware,
    (req, res) => {

        res.json({
            message: "Welcome to your private dashboard!",
            user: req.user,
            data: {
                totalTasks: 10,
                completedTasks: 7,
                pendingTasks: 3
            }
        });

    }
);

// ========================================
// EXPORT
// ========================================

module.exports = router;