import { useEffect, useState } from "react";
import ChatHeader from "./sideBar/ChatHeader";
import ChatItem from "./sideBar/ChatItem";
import ChatFooter from "./sideBar/ChatFooter";
import { useChat } from "../store/chat.store";
import ChatItemSkeleton from "./skeleton/ChatItemSkeleton";
import { useNavigate } from "react-router";

const ChatListSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { allUsers, getUsersFn, isUsersLoading } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    getUsersFn(navigate);
  }, [getUsersFn]);

  return (
    <div className="w-80 bg-zinc-900/90 border-r border-zinc-800 flex flex-col h-full rounded-xl">
      <ChatHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
        {isUsersLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ChatItemSkeleton key={`skeleton-${index}`} />
          ))
        ) : allUsers.length > 0 ? (
          allUsers.map((user) => <ChatItem key={user._id} user={user} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-sm">
              {searchQuery ? "No users found" : "No conversations yet"}
            </p>
          </div>
        )}
      </div>

      <ChatFooter />
    </div>
  );
};

export default ChatListSection;
