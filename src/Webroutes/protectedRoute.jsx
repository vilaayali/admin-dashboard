import { Outlet, Navigate } from "react-router";
import { useAuth } from "../authContext/authContext";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";


const ProtectedRoute = () => {
    const { token, role } = useAuth();


    if (!token.length) {
        return <Navigate to="/" replace />;
    }

    if (role === "user" && window.location.pathname !== "/product") {
        return <Navigate to="/product" replace />;
    }

    return <Outlet />;



};

export default ProtectedRoute;
