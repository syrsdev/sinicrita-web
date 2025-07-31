import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { JSX } from "react";
import MiddlewareLoading from "../components/loading/MiddlewareLoading";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <MiddlewareLoading />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
