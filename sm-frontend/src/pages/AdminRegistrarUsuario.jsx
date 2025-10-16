import { useState } from "react";
import axios from "axios";

function AdminRegisterUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "cliente", // valor por defecto
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cambia esta URL a la ruta de tu backend Django (por ejemplo: http://127.0.0.1:8000/api/usuarios/register/)
      const response = await axios.post("http://127.0.0.1:8000/api/usuarios/register/", formData);
      setMensaje("✅ Usuario registrado con éxito");
      setFormData({ username: "", email: "", password: "", role: "cliente" });
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al registrar el usuario");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Registrar nuevo usuario</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Rol</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-200"
            >
              <option value="admin">Administrador</option>
              <option value="vendedor">Vendedor</option>
              <option value="cliente">Cliente</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Registrar usuario
          </button>
        </form>

        {mensaje && <p className="text-center mt-4">{mensaje}</p>}
      </div>
    </div>
  );
}

export default AdminRegisterUser;
