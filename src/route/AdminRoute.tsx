import { JSX } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import MiddlewareLoading from "../components/loading/MiddlewareLoading";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return <MiddlewareLoading />;
  if (!user) return <Navigate to="/login" replace />;
  if (user && user.role !== "admin") return <Navigate to="/post" replace />;

  return children;
};

export default AdminRoute;
