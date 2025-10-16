import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Streaming Mania Dashboard</h1>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
