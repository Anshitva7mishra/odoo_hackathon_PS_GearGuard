import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/" />;
  if (!allowedRoles.includes(user.role.toLowerCase())) return <Navigate to="/dashboard" />;

  return children;
}
