import api from "./api";

export async function fetchDashboardStats() {
  const res = await api.get("/dashboard/stats");
  return res.data;
}
