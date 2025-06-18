import { create } from "zustand";
import api from "../config/apiConfig";
import { io } from "socket.io-client";
import { disconnect } from "mongoose";

const BACKEND_URL = "http://localhost:5173";

export const useAuth = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
  isUsernameLoading: false,
  error: null,
  isLoading: false,
  socket: null,
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
  connectToSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;
    const socket = io(BACKEND_URL, {});
    socket.connect();
    set({ socket: socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
