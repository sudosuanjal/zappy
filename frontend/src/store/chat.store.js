import { create } from "zustand";
import api from "../config/apiConfig";
import { useAuth } from "./auth.store";
import { useNavigate } from "react-router";

export const useChat = create((set, get) => ({
  allUsers: [],
  isUsersLoading: false,
  activeUser: null,
  messages: [],
  isMessageLoading: false,
  isMessageSending: false,
  getUsersFn: async (navigate, currentUsername) => {
    set({ isUsersLoading: true });
    try {
      const response = await api.get("/api/message/users");
      console.log(response.data);

      set({
        isUsersLoading: false,
        allUsers: response.data,
      });

      get().checkAndSetLastActiveUser(navigate, currentUsername);
    } catch (error) {
      set({ isUsersLoading: false });
      throw error;
    }
  },
  checkAndSetLastActiveUser: (navigate, currentUsername) => {
    const { allUsers, setActiveUser } = get();
    const lastUserId = localStorage.getItem("lastActiveUserId");
    if (currentUsername) return;

    if (lastUserId) {
      const lastUser = allUsers.find((user) => user._id === lastUserId);
      if (lastUser) {
        setActiveUser(lastUser);
        navigate(`/chat/${lastUser.username}`);
      }
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
  listenToMessage: () => {
    const { activeUser } = get();
    if (!activeUser) return;

    const socket = useAuth.getState().socket;
    socket.on("newMessage", (newMessage) => {
      if (
        newMessage.senderId === activeUser._id ||
        newMessage.receiverId === activeUser._id
      ) {
        set({ messages: [...get().messages, newMessage] });
      }
    });
  },
  unListenToMessage: () => {
    const socket = useAuth.getState().socket;
    socket.off("newMessage");
  },
  setActiveUser: (activeUser) => {
    localStorage.setItem("lastActiveUserId", activeUser._id);
    set({ activeUser });
  },
}));
