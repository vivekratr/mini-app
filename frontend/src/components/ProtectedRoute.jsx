import { useAuthStore } from "../stores/authStores";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
  }