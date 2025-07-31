import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { JSX } from "react";
import MiddlewareLoading from "../components/loading/MiddlewareLoading";

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <MiddlewareLoading />;
  if (user && user?.role != "admin") return <Navigate to="/post" replace />;
  if (user && user?.role == "admin")
    return <Navigate to="/dashboard" replace />;

  return children;
};

export default GuestRoute;
