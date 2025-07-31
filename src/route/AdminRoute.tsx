import { JSX } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (user && user.role !== "admin") return <Navigate to="/post" replace />;

  return children;
};

export default AdminRoute;
