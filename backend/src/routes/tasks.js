const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markComplete,
} = require("../controllers/taskController");

const router = express.Router();

// Routes
router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.post("/:id/complete", authMiddleware, markComplete);

module.exports = router;
