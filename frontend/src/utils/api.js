import axios from "axios";
import { toast } from "react-toastify";

// Base API configuration
const api = axios.create({
  baseURL:"http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    toast.error(message);
    return Promise.reject(error);
  }
);

// Authentication APIs
export const registerUser = async (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = async (userData) => {
  return api.post("/auth/login", userData);
};

export const getCurrentUser = async () => {
  return api.get("/auth/me");
};

// Task APIs
export const fetchTasks = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return api.get(`/tasks?${params}`);
};

export const createTask = async (taskData) => {
  return api.post("/tasks", taskData);
};

export const updateTask = async (taskId, updatedData) => {
  return api.put(`/tasks/${taskId}`, updatedData);
};

export const deleteTask = async (taskId) => {
  return api.delete(`/tasks/${taskId}`);
};

export const completeTask = async (taskId) => {
  return api.put(`/tasks/${taskId}`, { status: "Completed" });
};

// Admin APIs
export const fetchUsers = async () => {
  return api.get("/admin/users");
};

export const fetchUserTasks = async (userId) => {
  return api.get(`/admin/users/${userId}/tasks`);
};

// Export the configured API instance
export default api;
