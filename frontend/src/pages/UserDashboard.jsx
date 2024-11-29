import React from "react";
import { useNavigate } from "react-router-dom"; // If you're using React Router for navigation
import TaskList from "../components/tasks/TaskList"; // Assuming TaskList component is in this path
import './UserDashboard.css'; // Import the CSS file for styling

const UserDashboard = () => {
  const navigate = useNavigate(); // For navigation after logout

  // Handle logout by clearing the token and redirecting to the login page
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      {/* Header with logo and title */}
      <header className="header">
        <div className="logo">Task Manager</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main content area */}
      <main className="main-content">
        <TaskList />
      </main>
    </div>
  );
};

export default UserDashboard;
