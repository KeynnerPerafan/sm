import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("✅ Token decodificado:", decoded);
        setUser(decoded.username);
        setRole(decoded.role || "cliente"); // por si no tiene rol
      } catch (err) {
        console.error("❌ Error al decodificar token:", err);
        localStorage.removeItem("access");
      }
    } else {
      console.info("ℹ️ No hay token en localStorage");
    }
  }, []);

  const loginUser = async (username, password) => {
    const response = await api.post("/token/", { username, password });

    if (response.status === 200) {
      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      const decoded = jwtDecode(access);
      setUser(decoded.username);
      setRole(decoded.role || "cliente");

      return decoded.role || "cliente"; // devolvemos el rol
    } else {
      throw new Error("Credenciales inválidas");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
