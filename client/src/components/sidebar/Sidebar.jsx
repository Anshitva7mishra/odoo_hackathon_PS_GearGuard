import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { sidebarConfig } from "./sidebarConfig";

export default function Sidebar() {
  const { user } = useAuthStore();

  if (!user) return null;

  const roleKey = user.role ? user.role.toLowerCase() : "";
  const items = sidebarConfig[roleKey] || [];

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col h-full p-4">
      <div className="mb-8 px-2 flex items-center gap-2">
        <div className="w-8 h-8 bg-teal-400/10 rounded-lg flex items-center justify-center text-teal-400">
          ⚡
        </div>
        <div>
          <h2 className="text-white font-bold tracking-tight">GearGuard</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            {user.role} Workspace
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                isActive
                  ? "bg-teal-400 text-slate-900 shadow-lg shadow-teal-400/20 font-bold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-slate-900 font-bold text-xs">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm text-white font-medium truncate">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
