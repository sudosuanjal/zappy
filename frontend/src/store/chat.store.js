import { create } from "zustand";
import api from "../config/apiConfig";

export const useChat = create((set, get) => ({
  allUsers: [],
  isUsersLoading: false,
  activeUser: null,
  messages: [],
  isMessageLoading: false,
  isMessageSending: false,
  getUsersFn: async () => {
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
  getMessagesFn: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const response = await api.get(`/api/message/${userId}`);
      set({ isMessageLoading: false, messages: response.data });
    } catch (error) {
      set({ isMessageLoading: false });
      throw error;
    }
  },
  sendMessageFn: async (message) => {
    set({ isMessageSending: true });
    const { activeUser, messages } = get();
    try {
      console.log("sendMessageFn called");
      console.log("activUser: " + activeUser._id);
      console.log("message: " + message);

      const response = await api.post(`/api/message/send/${activeUser._id}`, {
        message,
      });
      set({ isMessageSending: false, messages: [...messages, response.data] });
    } catch (error) {
      set({ isMessageSending: false });
      console.log(error);

      throw error;
    }
  },
  setActiveUser: (activeUser) => set({ activeUser }),
}));
