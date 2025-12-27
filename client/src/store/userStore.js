import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null, 
  // example:
  // {
  //   id: 1,
  //   name: "Rahul",
  //   email: "rahul@company.com",
  //   role: "technician"
  // }

  setUser: (userData) => set({ user: userData }),

  clearUser: () => set({ user: null }),
}));
