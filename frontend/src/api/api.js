import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-task-backend.onrender.com/api", // 👈 Render backend URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
