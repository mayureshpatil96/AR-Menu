// src/services/api.js
import axios from "axios";

// ✅ For local development (when running on localhost)
const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
});

// 🥗 Get all menu items
export const getMenuItems = async () => {
  const response = await API.get("/menu");
  return response.data;
};

// 🍛 Add a new menu item (optional, for admin use)
export const addMenuItem = async (newItem) => {
  const response = await API.post("/menu", newItem);
  return response.data;
};
