import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authTokens", JSON.stringify(data));
        setUser(data);
        navigate("/dashboard");
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
