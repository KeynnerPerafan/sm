import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const access = localStorage.getItem("access_token");
  if (!access) return <Navigate to="/login" replace />;
  return children;
}