// const express = require("express");
// const authMiddleware = require("../middleware/auth");
// const {
//   getTasks,
//   createTask,
//   updateTask,
//   deleteTask,
//   markComplete,
// } = require("../controllers/taskController");

// const router = express.Router();

// // Routes
// router.get("/", authMiddleware, getTasks);
// router.post("/", authMiddleware, createTask);
// router.put("/:id", authMiddleware, updateTask);
// router.delete("/:id", authMiddleware, deleteTask);
// router.post("/:id/complete", authMiddleware, markComplete);

// module.exports = router;

const express = require("express");
const { getTasks, createTask, updateTask, deleteTask, markComplete} = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
router.delete("/:id/complete", auth, markComplete);


module.exports = router;
