import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import {
  addUser,
  deleteUser,
  getUsers,
} from "../../../services/Admin/users.service";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    role: "pendengar",
  });

  const fetchUsers = () => {
    setLoading(true);
    getUsers((res: AxiosResponse) => {
      if (res.status === 200) {
        setUsers(res.data.data || []);
      } else {
        console.error("Gagal memuat data users:", res);
      }
      setLoading(false);
    });
  };

  const handleDelete = (username: string) => {
    if (!confirm(`Yakin ingin menghapus user '${username}'?`)) return;
    deleteUser(username, (res: AxiosResponse) => {
      if (res.status === 200) {
        alert("User berhasil dihapus.");
        fetchUsers();
      } else {
        alert("Gagal menghapus user.");
        console.error(res);
      }
    });
  };

  const handleAddUser = () => {
    addUser(form);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manajemen User</h1>

      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          + Tambah User
        </button>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-2xl">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 border">{idx + 1}</td>
                  <td className="py-2 px-4 border">{user.username}</td>
                  <td className="py-2 px-4 border">{user.role}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(user.username)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Tidak ada data user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0  z-50 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Tambah User</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Username"
                className="w-full border px-3 py-2 rounded"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border px-3 py-2 rounded"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <input
                type="password"
                placeholder="Konfirmasi Password"
                className="w-full border px-3 py-2 rounded"
                value={form.password_confirmation}
                onChange={(e) =>
                  setForm({ ...form, password_confirmation: e.target.value })
                }
              />
              <select
                className="w-full border px-3 py-2 rounded"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="pendengar">Pendengar</option>
                <option value="pencerita">Pencerita</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
