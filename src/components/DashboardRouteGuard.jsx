import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const DashboardRouteGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin or superAdmin role
  if (!user || (user.role !== "admin" && user.role !== "SuperAdmin")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default DashboardRouteGuard;
