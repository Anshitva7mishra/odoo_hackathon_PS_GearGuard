import { useAuthStore } from "../../store/authStore";

export default function Topbar() {
  const { logout } = useAuthStore();

  return (
    <div className="bg-surface p-4 flex justify-end">
      <button onClick={logout} className="btn-brand px-4 py-1">
        Logout
      </button>
    </div>
  );
}
