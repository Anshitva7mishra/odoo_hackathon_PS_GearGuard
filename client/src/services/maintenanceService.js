import api from "./api";

// Create new maintenance log
export const createMaintenanceLog = async (token, data) => {
  const res = await api.post("/maintenance", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Get logs by equipment
export const getMaintenanceLogsByEquipment = async (token, equipmentId) => {
  const res = await api.get(`/maintenance/${equipmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
