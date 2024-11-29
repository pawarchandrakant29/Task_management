import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../components/tasks/TaskList";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
      } catch (error) {
        alert("Failed to fetch tasks: " + error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>All Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
      <TaskList />
    </div>
  );
};

export default AdminDashboard;
