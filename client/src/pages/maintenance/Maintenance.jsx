import { useAuthStore } from "../../store/authStore";

import MaintenanceKanban from "./MaintenanceKanban";
import MaintenanceCalendar from "./MaintenanceCalendar";
import ScrapQueue from "./ScrapQueue";

export default function Maintenance() {
  const { user } = useAuthStore();

  // ⛔ safety guard
  if (!user?.role) {
    return (
      <div className="text-center text-red-400 font-bold">
        Unauthorized Access
      </div>
    );
  }

  const role = user.role.toLowerCase();

  /* ================= ROLE BASED RENDER ================= */

  // 👷 TECHNICIAN
  if (role === "technician") {
    return <MaintenanceKanban />;
  }

  // 👨‍💼 MANAGER
  if (role === "manager") {
    return <MaintenanceCalendar />;
  }

  // 🛡️ ADMIN
  if (role === "admin") {
    return <ScrapQueue />;
  }

  // fallback (never hit ideally)
  return (
    <div className="text-center text-secondary">
      No maintenance view available for this role
    </div>
  );
}
