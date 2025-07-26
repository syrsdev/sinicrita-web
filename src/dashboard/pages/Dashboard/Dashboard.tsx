import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  role: string;
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Dummy fetch (nanti bisa diganti API asli)
    setUsers([
      { id: 1, name: "Budi", role: "pencerita" },
      { id: 2, name: "Sari", role: "pencerita" },
    ]);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-600 text-sm">Total Pencerita</h2>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-600 text-sm">Total Posts</h2>
          <p className="text-2xl font-bold">10</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-600 text-sm">
            Jumlah Chat yang Berlangsung
          </h2>
          <p className="text-2xl font-bold">2</p>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-medium mb-4">User List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-primary text-left text-sm text-white">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="text-sm text-gray-700">
                <td className="p-2 border">{idx + 1}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
