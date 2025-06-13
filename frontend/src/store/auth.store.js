import { create } from "zustand";
import api from "../config/apiConfig";

export const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
  isUsernameLoading: false,
  error: null,
  isLoading: false,
  loginFn: async () => {
    console.log("loginFn called");
    set({ isAuthLoading: true });
    try {
      const response = await api.post("/api/auth/login");
      set({
        isAuthLoading: false,
        error: null,
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        isAuthLoading: false,
        user: null,
        error: error,
        isAuthenticated: false,
      });
      throw error;
    }
  },
  usernameFn: async (username) => {
    console.log("usernameFn called");
    set({ isUsernameLoading: true });
    try {
      const response = await api.put("/api/auth/username", { username });
      set({ isUsernameLoading: false, user: response.data.user });
    } catch (error) {
      set({ isUsernameLoading: false });
      throw error;
    }
  },
  checkAuthFn: async () => {
    console.log("checkAuthFn called");
    set({ isLoading: true, isAuthenticated: false });
    try {
      const response = await api.get("/api/auth/check-auth");
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ isLoading: false, user: null, isAuthenticated: false });
      console.log(error);

      throw error;
    }
  },
}));
