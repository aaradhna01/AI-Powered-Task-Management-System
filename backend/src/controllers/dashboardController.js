// src/controllers/dashboardController.js
const Task = require("../models/Task");

async function getDashboard(req, res) {
  try {
    const userId = req.user.id;

    const tasks = await Task.findAll({ where: { user_id: userId } });

    // Count tasks by status
    const pending = tasks.filter(t => !t.completed && new Date(t.due_date) >= new Date()).length;
    const completed = tasks.filter(t => t.completed).length;
    const overdue = tasks.filter(t => !t.completed && new Date(t.due_date) < new Date()).length;

    // Return tasks summary + all tasks
    res.json({
      summary: { pending, completed, overdue },
      tasks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getDashboard };
