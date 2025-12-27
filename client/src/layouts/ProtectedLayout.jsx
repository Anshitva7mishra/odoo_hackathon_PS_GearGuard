import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <div className="bg-[#0F172A]">
      
      <Sidebar />
      <div className="ml-20 lg:ml-64 min-h-screen flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
