import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import AdminRegisterUser from "./pages/AdminRegisterUser";
import DashboardAdmin from "./pages/AdminDashboard";
import DashboardCliente from "./pages/ClienteDashboard";
import DashboardVendedor from "./pages/VendedorDashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* 🔒 Rutas protegidas por rol */}
          <Route
            path="/admin/register-user"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminRegisterUser />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <DashboardAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/vendedor/stock"
            element={
              <PrivateRoute allowedRoles={["vendedor"]}>
                <DashboardVendedor />
              </PrivateRoute>
            }
          />

          <Route
            path="/cliente/mis-compras"
            element={
              <PrivateRoute allowedRoles={["cliente"]}>
                <DashboardCliente />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
