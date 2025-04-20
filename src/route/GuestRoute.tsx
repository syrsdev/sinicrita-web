import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { JSX } from "react";

const GuestRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();

    if (user) return <Navigate to="/post" replace />;

    return children;
};

export default GuestRoute;
