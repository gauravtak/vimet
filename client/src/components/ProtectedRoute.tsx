import { Navigate } from "react-router";
import { useAuth } from "../context/authProvider.tsx";

interface Props {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { token, isLoading } = useAuth();

    // Still reading from localStorage — render nothing to avoid a flash
    if (isLoading) return null;

    if (!token) return <Navigate to="/login" replace />;

    return <>{children}</>;
};
