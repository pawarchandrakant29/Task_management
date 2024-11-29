import React from "react";
import { Button, Typography, Box, Paper } from "@mui/material";

const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <Paper elevation={6} sx={{ padding: 3, width: "80%", maxWidth: 600 }}>
          <Typography variant="h5" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Description:</strong> {task.description}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Category:</strong> {task.category}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Priority:</strong> {task.priority}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Status:</strong> {task.status}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
          </Typography>

          <Box textAlign="center" mt={2}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default TaskModal;
