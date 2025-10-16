import { useState, useEffect } from "react";
import api from "../services/api";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // intenta cargar perfil si hay token
  useEffect(() => {
    const access = localStorage.getItem("access_token");
    if (!access) {
      setLoading(false);
      return;
    }

    api
      .get("profile/")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async ({ username, password }) => {
    const res = await api.post("token/", { username, password });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    api.defaults.headers.Authorization = `Bearer ${res.data.access}`;

    // obtener perfil
    const profile = await api.get("profile/");
    setUser(profile.data);
    return profile.data;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    delete api.defaults.headers.Authorization;
  };

  return { user, loading, login, logout, setUser };
}