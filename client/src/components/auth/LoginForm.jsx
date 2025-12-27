import { useAuthStore } from "../../store/authStore";
import { roleRedirect } from "../../utils/roleRedirect";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  function handleLogin(role) {
    login(role);
    navigate(roleRedirect(role));
  }

  return (
    <div className="bg-surface p-6 rounded">
      <h2 className="mb-4">Login (Demo)</h2>
      <button onClick={() => handleLogin("technician")} className="btn-success mb-2 w-full">Technician</button>
      <button onClick={() => handleLogin("manager")} className="btn-success mb-2 w-full">Manager</button>
      <button onClick={() => handleLogin("admin")} className="btn-success w-full">Admin</button>
    </div>
  );
}
