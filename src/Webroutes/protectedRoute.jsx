import { Outlet, Navigate } from "react-router";
import { useAuth } from "../authContext/authContext";

const ProtectedRoute = () => {
    const { token } = useAuth();
    return token?.length > 0 ? (
        <>
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;
