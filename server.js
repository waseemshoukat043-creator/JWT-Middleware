const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

app.use(express.json());

// ========================================
// ROUTES
// ========================================

const authRoutes = require("./routes/authRoutes");
const privateRoutes = require("./routes/privateRoutes");

// Authentication routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/private", privateRoutes);

// ========================================
// HOME ROUTE
// ========================================

app.get("/", (req, res) => {
    res.json({
        message: "Day 19 JWT Authentication API is working!"
    });
});

// ========================================
// 404 ROUTE
// ========================================

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});