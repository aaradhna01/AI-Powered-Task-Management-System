const Task = require("../models/Task");

// Get all tasks
async function getTasks(req, res) {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Create new task
async function createTask(req, res) {
  try {
    const { title, description, category, priority, due_date } = req.body;
    const task = await Task.create({
      title,
      description,
      category,
      priority,
      due_date,
      user_id: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update task
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, category, priority, due_date } = req.body;

    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.category = category || task.category;
    task.priority = priority || task.priority;
    task.due_date = due_date || task.due_date;

    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete task
async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Mark task complete
async function markComplete(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = "completed";
    task.completed_at = new Date();
    await task.save();

    res.json({ message: "Task marked as complete", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask, markComplete };
