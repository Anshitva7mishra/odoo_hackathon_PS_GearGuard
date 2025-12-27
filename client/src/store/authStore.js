import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null, // { role: "technician" | "manager" | "admin" }

  login: (role) => set({ user: { role } }),
  logout: () => set({ user: null }),
}));
