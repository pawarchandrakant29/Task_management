import React, { createContext, useState } from "react";
import axios from "axios";

// Create context
export const AuthContext = createContext();

// AuthProvider component that wraps the app and provides context values
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      localStorage.setItem("role", response.data.role); // Save role
      setUser({ email, role: response.data.role }); // Set user state
    } catch (error) {
      throw error; // Let the calling component handle the error
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null); // Clear user data
  };

  // Fetch user data (for protected routes, etc.)
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("Error fetching user:", error);
      logout(); // Optionally log the user out if the session is invalid
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
