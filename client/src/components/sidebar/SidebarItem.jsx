import { NavLink } from "react-router-dom";

export default function SidebarItem({ label, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `block px-3 py-2 rounded text-sm ${
          isActive
            ? "bg-base text-primary"
            : "text-secondary hover:text-primary"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
