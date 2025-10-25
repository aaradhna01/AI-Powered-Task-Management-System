// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://ai-task-backend.onrender.com/api", // 👈 Render backend URL
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

// // src/api/api.js
// import axios from "axios";

// // ✅ Localhost ke liye baseURL
// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // ✅ Token automatically add hoga har request me
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

import axios from "axios";

// ✅ Base URL from environment variable
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 🔑 yaha env variable use ho raha hai
});

// ✅ Token automatically add hoga har request me
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

