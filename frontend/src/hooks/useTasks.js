// import { useQuery } from "@tanstack/react-query";
// import api from "../api/api";

// export function useTasks() {
//   return useQuery(["tasks"], async () => {
//     const res = await api.get("/tasks");
//     return res.data;
//   });
// }

import { useState, useEffect } from "react";
import api from "../api/api";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // ✅ Get all tasks
  const fetchTasks = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new task
  const addTask = async (title) => {
    if (!token) return;
    try {
      const res = await api.post(
        "/tasks",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    if (!token) return;
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, addTask, deleteTask, loading };
}
