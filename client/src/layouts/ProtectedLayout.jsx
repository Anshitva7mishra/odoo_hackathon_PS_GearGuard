import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

export default function ProtectedLayout() {
  return (
    <div className="flex min-h-screen bg-base">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 ml-20 lg:ml-64 flex flex-col">
        <Topbar />

        {/* 👇 YAHI SABSE IMPORTANT LINE */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
