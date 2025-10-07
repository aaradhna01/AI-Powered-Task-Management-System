// // src/App.js
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import TasksPage from "./pages/TasksPage";
// import ChatWithPDF from "./pages/ChatWithPDF";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { AuthProvider } from "./auth/useAuth";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Routes */}
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/tasks"
//             element={
//               <ProtectedRoute>
//                 <TasksPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/chat"
//             element={
//               <ProtectedRoute>
//                 <ChatWithPDF />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/useAuth";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import ChatWithPDF from "./pages/ChatWithPDF";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/chat-pdf" element={<ChatWithPDF />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
