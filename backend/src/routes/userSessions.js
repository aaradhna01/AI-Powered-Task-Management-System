const express = require("express");
const { getUserSessions, deleteSession } = require("../controllers/userSessionController");

const router = express.Router();

// Get all sessions for a user
router.get("/:userId", getUserSessions);

// Delete a session
router.delete("/:id", deleteSession);

module.exports = router;
