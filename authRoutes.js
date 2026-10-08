const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ========================================
// TEMPORARY USERS STORAGE
// ========================================

const users = [];

// ========================================
// REGISTER API
// ========================================

router.post("/register", (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check existing user
        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create new user
        const user = {
            id: users.length + 1,
            name: name,
            email: email,
            password: password
        };

        users.push(user);

        // Send response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// ========================================
// LOGIN API
// ========================================

router.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );

        // Check credentials
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Send response
        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token: token
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// ========================================
// EXPORT
// ========================================

module.exports = router;