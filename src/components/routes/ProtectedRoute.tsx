import { authStore } from "../../store/authStore";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const token: string | null = authStore((state) => state.access_token);
  return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
