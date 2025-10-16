import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Bienvenido a Streaming Mania 🎬
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-md">
        Ingresa con tu cuenta para acceder al panel de ventas, clientes y productos.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
        >
          Iniciar sesión
        </Link>

        <Link
          to="/dashboard"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-semibold"
        >
          Ir al panel
        </Link>
      </div>
    </div>
  );
}
