import React, { useState, useEffect } from "react";
import api from "../api/api";
import "./Tasks.css";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await api.get("/api/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await api.post(
        "/api/tasks",
        { title: newTask, description: "" },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tasks-container">
      <h2 className="tasks-title">Your Tasks</h2>

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.status === "completed" ? "done" : ""}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
