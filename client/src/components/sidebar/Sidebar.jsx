import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { sidebarConfig } from "./sidebarConfig";

export default function Sidebar() {
  const { user } = useAuthStore();
  const items = sidebarConfig[user.role];

  return (
    <aside className="w-64 bg-surface p-4">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className="block text-secondary mb-3"
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}
