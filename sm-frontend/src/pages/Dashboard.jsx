import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-4">Streaming Mania</h2>
          <nav className="flex flex-col space-y-2 px-4">
            <a href="#" className="hover:bg-indigo-500 p-2 rounded">Inicio</a>
            <a href="#" className="hover:bg-indigo-500 p-2 rounded">Productos</a>
            <a href="#" className="hover:bg-indigo-500 p-2 rounded">Clientes</a>
            <a href="#" className="hover:bg-indigo-500 p-2 rounded">Ventas</a>
          </nav>
        </div>

        <button
          onClick={logoutUser}
          className="m-4 bg-red-500 hover:bg-red-600 py-2 rounded text-center"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Bienvenido, {user?.username || "Usuario"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-600 font-semibold">Clientes</h3>
            <p className="text-2xl font-bold text-indigo-600">120</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-600 font-semibold">Productos</h3>
            <p className="text-2xl font-bold text-indigo-600">85</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-600 font-semibold">Ventas</h3>
            <p className="text-2xl font-bold text-indigo-600">340</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
