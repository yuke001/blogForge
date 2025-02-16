import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/users";

// Register a new user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Login user
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

// Logout user
export const logoutUser = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_URL}/logout`, config);
  return response.data;
};

// Forgot password
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${API_URL}/reset-password/${token}`, {
    password: newPassword,
  });
  return response.data;
};

// Update user profile
export const updateProfile = async (userId, profileData, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${API_URL}/profile/${userId}`, profileData, config);
  return response.data;
};

export async function getUserProfile() {
    const response = await fetch("/api/users/profile", {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  }
  