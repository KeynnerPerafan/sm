import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("access");
    return token ? jwtDecode(token) : null;
  });

  const login = async (username, password) => {
    try {
      const API = import.meta.env.VITE_API_BASE;
      const res = await fetch(`${API}/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");

      const data = await res.json();

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      const decoded = jwtDecode(data.access);
      setUser(decoded);

      // 🔸 Redirige según el rol
      if (decoded.rol === "admin") navigate("/admin/dashboard");
      else if (decoded.rol === "vendedor") navigate("/vendedor/stock");
      else navigate("/cliente/mis-compras");
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
