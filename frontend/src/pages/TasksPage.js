import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  const addTask = (t) => setTasks([...tasks, { ...t, id: Date.now(), status: "pending" }]);

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm onSubmit={addTask} />
      <div>
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}
