const express = require("express");
const multer = require("multer");
const { uploadAttachment, getAttachments, deleteAttachment } = require("../controllers/taskAttachmentController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload file
router.post("/", upload.single("file"), uploadAttachment);

// Get all attachments of a task
router.get("/:taskId", getAttachments);

// Delete attachment
router.delete("/:id", deleteAttachment);

module.exports = router;
