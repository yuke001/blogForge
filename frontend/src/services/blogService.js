// frontend/src/services/blogService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/blog"; // Corrected API_URL

// Fetch all blogs
export const getBlogs = async () => {
  try {
    const response = await axios.get(API_URL);
    
    console.log("API response:", response.data); // Debugging log

    // If API returns an object instead of an array, extract the array
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.blogs && Array.isArray(response.data.blogs)) {
      return response.data.blogs;
    } else {
      console.error("Unexpected API response:", response.data);
      return []; // Ensure an array is always returned
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Ensure it never returns undefined or null
  }
};

// Fetch a single blog by slug
export const getBlog = async (slug) => {
  const response = await axios.get(`${API_URL}/${slug}`);
  return response.data;
};

// Create a new blog
export const createBlog = async (blogData, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, blogData, config);
  return response.data;
};

// Update an existing blog
export const updateBlog = async (slug, blogData, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${API_URL}/${slug}`, blogData, config);
  return response.data;
};

// Delete a blog
export const deleteBlog = async (slug, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${API_URL}/${slug}`, config);
  return response.data;
};

// Like or unlike a blog
export const toggleLikeBlog = async (slug, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_URL}/${slug}/like`, {}, config);
  return response.data;
};