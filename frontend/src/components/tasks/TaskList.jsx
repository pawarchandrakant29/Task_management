import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";
import TaskModal from "./TaskModal";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else if (response.data && response.data.tasks) {
        setTasks(response.data.tasks);
      } else {
        setTasks([]);
        toast.error("Unexpected response format. No tasks found.");
      }
    } catch (error) {
      toast.error("Failed to fetch tasks: " + error.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task: " + error.message);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Task marked as completed!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to mark task as completed: " + error.message);
    }
  };

  const handleCreateTask = () => {
    navigate("/createform");
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        padding: "20px",
        backgroundColor: "#f4f7fc",
        overflow: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ color: "#2c3e50" }}>
        Task List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={handleCreateTask}
      >
        Create Task
      </Button>

      <div style={{ marginBottom: "20px" }}>
        <FormControl style={{ marginRight: "20px", minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ minWidth: 150 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filters.priority}
            onChange={(e) =>
              setFilters({ ...filters, priority: e.target.value })
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={2} style={{ width: "100%" }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "150px",
                  transition: "transform 0.3s",
                  width: "70%",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.status}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.priority}
                </Typography>

                <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => setSelectedTask(task)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => handleComplete(task._id)}
                  >
                    Complete
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No tasks available
          </Typography>
        )}
      </Grid>

      {showForm && (
        <TaskForm
          task={taskToEdit}
          onClose={() => {
            setShowForm(false);
            setTaskToEdit(null);
          }}
          onTaskSubmit={fetchTasks}
        />
      )}

      <div className="set1">
        {selectedTask && (
          <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
        )}
      </div>
    </div>
  );
};

export default TaskList;
