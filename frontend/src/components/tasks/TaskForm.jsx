import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
  Box,
  Typography,
  Grid,
  Container,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TaskDashboardWithForm = () => {
  const [task, setTask] = useState(null); // null indicates a new task
  const [showModal, setShowModal] = useState(true); // Directly set modal to be shown
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setCategory(task.category || "");
      setPriority(task.priority || "Low");
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    }
  }, [task]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleTaskSubmit = () => {
    setShowModal(false); // Close modal after submitting
    // You can also refresh your task list here if needed
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      category,
      priority,
      dueDate,
    };

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage or context
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      };

      if (task) {
        // Update task if it exists
        await axios.put(`http://localhost:5000/api/tasks/${task._id}`, taskData, config);
        toast.success("Task updated successfully!");
      } else {
        // Create new task
        await axios.post("http://localhost:5000/api/tasks", taskData, config);
        toast.success("Task created successfully!");
      }

      handleTaskSubmit();
      
      navigate("/user-dashboard"); // Trigger after task creation or update
    } catch (error) {
      toast.error("Failed to save task: " + (error.response?.data?.message || error.message));
    }

    handleClose(); // Close the modal after task creation/updating
  };

  const handlecloseTask = () => {
    navigate("/user-dashboard"); // Navigate to the /createform route when button is clicked
  };

  return (
    <Container>
      {/* Modal for Task Creation/Editing */}
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="task-form-title"
        aria-describedby="task-form-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            width: "400px",
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handlecloseTask}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" id="task-form-title" align="center" sx={{ marginBottom: 3 }}>
            {task ? "Edit Task" : "Create Task"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Title Input */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>

              {/* Description Input */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>

              {/* Category Input */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  variant="outlined"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Grid>

              {/* Priority Dropdown */}
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    label="Priority"
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Due Date Input */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Due Date"
                  variant="outlined"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ padding: "12px 0", borderRadius: "5px" }}
                >
                  {task ? "Update Task" : "Create Task"}
                </Button>
              </Grid>

              {/* Cancel Button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={handlecloseTask}
                  sx={{ padding: "12px 0", marginTop: 2 }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default TaskDashboardWithForm;
