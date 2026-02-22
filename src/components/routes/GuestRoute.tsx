import { Navigate, Outlet } from "react-router";
import { authStore } from "../../store/authStore";

const GuestRoute = () => {
  const token = authStore((s) => s.access_token);

  return token ? <Navigate to="/main" replace /> : <Outlet />;
};
export default GuestRoute;
