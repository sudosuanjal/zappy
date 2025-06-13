import { useState } from "react";
import { useAuth } from "../store/auth.store";
import ChatHeader from "./chat/ChatHeader";
import ChatItem from "./chat/ChatItem";
import ChatFooter from "./chat/ChatFooter";

const chatData = [
  {
    id: 1,
    name: "Bella Huffman",
    lastMessage: "Sure, but I'm busy right now.",
    time: "5:12 PM",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format",
    unread: 2,
    online: true,
    active: true,
  },
  {
    id: 2,
    name: "Alex Johnson",
    lastMessage: "Thanks for the help!",
    time: "4:45 PM",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    unread: 0,
    online: true,
    active: false,
  },
  {
    id: 3,
    name: "Sarah Wilson",
    lastMessage: "Let's meet tomorrow",
    time: "3:30 PM",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    unread: 1,
    online: false,
    active: false,
  },
  {
    id: 4,
    name: "Mike Chen",
    lastMessage: "Great work on the project!",
    time: "2:15 PM",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    unread: 0,
    online: true,
    active: false,
  },
  {
    id: 5,
    name: "Emma Davis",
    lastMessage: "Can you send me the files?",
    time: "1:20 PM",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face&auto=format",
    unread: 3,
    online: false,
    active: false,
  },
  {
    id: 6,
    name: "Team Design",
    lastMessage: "New mockups are ready",
    time: "12:45 PM",
    avatar:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=40&h=40&fit=crop&crop=face&auto=format",
    unread: 0,
    online: false,
    active: false,
  },
  {
    id: 7,
    name: "Mike Chen",
    lastMessage: "Great work on the project!",
    time: "2:15 PM",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    unread: 0,
    online: true,
    active: false,
  },
  {
    id: 8,
    name: "Emma Davis",
    lastMessage: "Can you send me the files?",
    time: "1:20 PM",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face&auto=format",
    unread: 3,
    online: false,
    active: false,
  },
  {
    id: 9,
    name: "Team Design",
    lastMessage: "New mockups are ready",
    time: "12:45 PM",
    avatar:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=40&h=40&fit=crop&crop=face&auto=format",
    unread: 0,
    online: false,
    active: false,
  },
];

const ChatListSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState(1);

  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-zinc-900/90 border-r border-zinc-800 flex flex-col h-full rounded-xl">
      <ChatHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
        {filteredChats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} setActiveChat={setActiveChat} />
        ))}
      </div>

      <ChatFooter />
    </div>
  );
};

export default ChatListSection;
