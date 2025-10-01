const TaskAttachment = require("../models/TaskAttachment");
const Task = require("../models/Task");

// Upload file (metadata save karna DB me)
async function uploadAttachment(req, res) {
  try {
    const { task_id } = req.body;
    const file = req.file; // multer se aayega

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const attachment = await TaskAttachment.create({
      task_id,
      file_name: file.originalname,
      file_path: file.path,
      file_size: file.size,
    });

    res.status(201).json(attachment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all attachments of a task
async function getAttachments(req, res) {
  try {
    const { taskId } = req.params;
    const attachments = await TaskAttachment.findAll({ where: { task_id: taskId } });
    res.json(attachments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete attachment
async function deleteAttachment(req, res) {
  try {
    const { id } = req.params;
    await TaskAttachment.destroy({ where: { id } });
    res.json({ message: "Attachment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { uploadAttachment, getAttachments, deleteAttachment };
