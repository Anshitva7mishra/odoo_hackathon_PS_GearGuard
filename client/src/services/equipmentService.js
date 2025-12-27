import api from "./api";

// Fetch all equipment
export const getEquipment = async () => {
  const res = await api.get("/equipment");
  return res.data;
};

// Add new equipment
export const addEquipment = async (data) => {
  const res = await api.post("/equipment", data);
  return res.data;
};

// Update equipment status
export const updateEquipmentStatus = async (id, status) => {
  const res = await api.put(`/equipment/${id}`, { status });
  return res.data;
};
