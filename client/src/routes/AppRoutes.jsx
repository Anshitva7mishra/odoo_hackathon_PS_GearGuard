import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ProtectedRoute from "./ProtectedRoute";

// Public pages
import Home from "../pages/public/Home";
import ForgotPassword from "../pages/public/ForgotPassword";
import ResetPassword from "../pages/public/ResetPassword";

// Protected common pages
import Dashboard from "../pages/dashboard/Dashboard";
import Maintenance from "../pages/maintenance/Maintenance";
import AccountSettings from "../pages/settings/AccountSettings";

// Reports (Manager/Admin)
import TeamWorkload from "../pages/reports/TeamWorkload";

// Config (Admin)
import EquipmentCategories from "../pages/config/EquipmentCategories";

// Equipment
import EquipmentList from "../pages/equipment/EquipmentList";
import EquipmentDetail from "../pages/equipment/EquipmentDetail";
import ArchivedEquipment from "../pages/equipment/ArchivedEquipment";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* ================= PROTECTED ROUTES ================= */}
      <Route element={<ProtectedLayout />}>
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute allowedRoles={["technician", "manager", "admin"]}>
              <Dashboard />
            // </ProtectedRoute>
          }
        />

        {/* Maintenance */}
        <Route
          path="/maintenance"
          element={
            <ProtectedRoute allowedRoles={["technician", "manager", "admin"]}>
              <Maintenance />
            </ProtectedRoute>
          }
        />
        {/* Equipment */}
        <Route
          path="/equipment"
          element={
            <ProtectedRoute allowedRoles={["technician", "manager", "admin"]}>
              <EquipmentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/equipment/:id"
          element={
            <ProtectedRoute allowedRoles={["technician", "manager", "admin"]}>
              <EquipmentDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/equipment/archived"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <ArchivedEquipment />
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <TeamWorkload />
            </ProtectedRoute>
          }
        />

        {/* Configuration */}
        <Route
          path="/config"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EquipmentCategories />
            </ProtectedRoute>
          }
        />

        {/* Account Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["technician", "manager", "admin"]}>
              <AccountSettings />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
