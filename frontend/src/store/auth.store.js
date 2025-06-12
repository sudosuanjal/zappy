import { create } from "zustand";
import api from "../config/apiConfig";

export const useAuth = create((set) => ({
  user: null,
  isAuthLoading: false,
  error: null,
  login: async (username) => {
    set({ isAuthLoading: true });
    try {
      const response = await api.post("/api/auth/login", { username });
      set({ isAuthLoading: false, error: null });
    } catch (error) {
      set({ isAuthLoading: false, user: null, error: error });
      throw error;
    }
  },
}));
