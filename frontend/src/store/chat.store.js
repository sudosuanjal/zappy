import { create } from "zustand";

export const useChat = create((set) => ({
  allUsers: null,
  isUsersLoading: null,
  getUsersFn: async (req, res) => {
    set({ isUsersLoading: true });
    try {
      const response = await api.get("/api/message/users");
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
