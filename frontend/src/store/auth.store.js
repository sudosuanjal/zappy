import { create } from "zustand";
import api from "../config/apiConfig";

export const useAuth = create((set) => ({
  user: null,
  isAuthLoading: false,
  login: async () => {
    set({ isAuthLoading: true });
    try {
      const response = await api.post("/api/auth/login");
      set({ isAuthLoading: false });
    } catch (error) {
      set({ isAuthLoading: false, user: null });
      throw error;
    }
  },
}));
