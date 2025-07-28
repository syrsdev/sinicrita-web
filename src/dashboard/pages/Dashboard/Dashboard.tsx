import { useEffect, useState } from "react";
import { getDashboard } from "../../../services/Admin/dashboard.service";
import { Link } from "react-router-dom";

type User = {
  id: number;
  username: string;
  role: string;
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPencerita, setTotalPencerita] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const [totalChat, setTotalChat] = useState(0);

  useEffect(() => {
    getDashboard((res) => {
      setUsers(res.data.data.users);
      setTotalPencerita(res.data.data.totalPencerita);
      setTotalPost(res.data.data.totalPost);
      setTotalChat(res.data.data.totalChat);
    });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-600 text-sm">Total Pencerita</h2>
          <p className="text-2xl font-bold">{totalPencerita}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-600 text-sm">Total Posts</h2>
          <p className="text-2xl font-bold">{totalPost}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-600 text-sm">
            Jumlah Chat yang Berlangsung
          </h2>
          <p className="text-2xl font-bold">{totalChat}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center w-full my-4">
          <h2 className="text-lg font-medium">Users</h2>
          <Link to="users" className="bg-primary text-white px-4 py-2 rounded">
            lihat selengkapnya
          </Link>
        </div>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-primary text-left text-sm text-white">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, id) => (
              <tr key={user.id} className="text-sm text-gray-700">
                <td className="p-2 border">{id + 1}</td>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
