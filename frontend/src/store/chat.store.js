import { create } from "zustand";
import api from "../config/apiConfig";

export const useChat = create((set) => ({
  allUsers: null,
  isUsersLoading: false,
  getUsersFn: async (req, res) => {
    set({ isUsersLoading: true });
    try {
      const response = await api.get("/api/message/users");
      console.log(response.data);

      set({
        isUsersLoading: false,
        allUsers: response.data,
      });
    } catch (error) {
      set({ isUsersLoading: false });
      throw error;
    }
  },
}));
