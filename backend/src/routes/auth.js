const express = require("express");
const { register, login, logout, refreshToken, verifyEmail } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth"); // optional for logout route

const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.post("/refresh", refreshToken);
// router.get("/verify-email/:token", verifyEmail);

module.exports = router;
