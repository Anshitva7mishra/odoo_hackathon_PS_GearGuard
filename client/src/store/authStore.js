import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const storedUser = JSON.parse(localStorage.getItem("user"));

export const useAuthStore = create((set) => ({
  user: storedUser || null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(API_URL + "login", {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));

        set({ user: response.data, isLoading: false });
        return true;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      set({ error: msg, isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
