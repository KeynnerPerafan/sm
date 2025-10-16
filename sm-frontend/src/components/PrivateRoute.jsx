import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // No hay sesión → redirige al login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    // Rol no permitido → redirige al dashboard del rol correcto
    if (user.rol === "vendedor") return <Navigate to="/vendedor/stock" replace />;
    if (user.rol === "cliente") return <Navigate to="/cliente/mis-compras" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
