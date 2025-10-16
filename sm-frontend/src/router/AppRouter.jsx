import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      {/* Página pública */}
      <Route path="/login" element={<Login />} />

      {/* Página protegida */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRouter;