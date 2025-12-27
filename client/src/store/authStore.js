import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

/* ---------------- SAFE LOCAL STORAGE READ ---------------- */
const storedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
})();

/* ---------------- AUTH STORE ---------------- */
export const useAuthStore = create((set) => ({
  user: storedUser,
  token: storedUser?.token || null,
  isLoading: false,
  error: null,

  /* ---------------- LOGIN ---------------- */
  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      /**
       * Expected backend response:
       * {
       *   _id,
       *   name,
       *   email,
       *   role,
       *   token
       * }
       */
      const userData = res.data;

      if (!userData?.token) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("user", JSON.stringify(userData));

      set({
        user: userData,
        token: userData.token,
        isLoading: false,
      });

      return true;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Login failed";

      set({
        error: msg,
        isLoading: false,
        user: null,
        token: null,
      });

      return false;
    }
  },

  /* ---------------- LOGOUT ---------------- */
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
