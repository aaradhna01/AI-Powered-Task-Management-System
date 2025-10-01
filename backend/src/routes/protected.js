const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

// Example Protected Route
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your dashboard!", userId: req.user.id });
});

module.exports = router;
