import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/public/ForgotPassword";
import ResetPassword from "../pages/public/ResetPassword";

import Home from "../pages/public/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import MaintenanceKanban from "../pages/maintenance/MaintenanceKanban";
import Reports from "../pages/reports/TeamWorkload";
import Configuration from "../pages/config/EquipmentCategories";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maintenance"
          element={
            <ProtectedRoute allowedRoles={["technician", "manager", "admin"]}>
              <MaintenanceKanban />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/config"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Configuration />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
