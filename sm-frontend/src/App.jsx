import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./auth/LoginPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRegistrarUsuario from "./pages/AdminRegistrarUsuario"; // 👈 nueva página

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* 🔒 Solo para el admin */}
          <Route
            path="/admin/registrar"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminRegistrarUsuario />
              </PrivateRoute>
            }
          />

          <Route
            path="/vendedor"
            element={
              <PrivateRoute requiredRole="vendedor">
                <VendedorDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
