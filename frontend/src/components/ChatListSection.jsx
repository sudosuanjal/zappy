import { Search, Plus, MoreVertical, Phone, Video } from "lucide-react";
import { useState } from "react";

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
];

const ChatListSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState(1);

  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ChatItem = ({ chat }) => (
    <div
      onClick={() => setActiveChat(chat.id)}
      className={`flex items-center p-4 cursor-pointer transition-all duration-200 rounded-xl mx-2 mb-2 ${
        chat.active
          ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30"
          : "hover:bg-zinc-800/50"
      }`}
    >
      <div className="relative">
        <img
          src={chat.avatar || "/placeholder.svg"}
          alt={chat.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/30 shadow-lg"
        />
        {chat.online && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900 animate-pulse"></div>
        )}
      </div>

      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-100 truncate">{chat.name}</h3>
          <span className="text-xs text-gray-400">{chat.time}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
          {chat.unread > 0 && (
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs rounded-full px-2 py-1 ml-2 shadow-lg shadow-purple-500/20">
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-zinc-900/90 border-r border-zinc-800 flex flex-col h-full rounded-xl">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-100">Messages</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full bg-zinc-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-200 text-gray-400 hover:text-white">
              <Video size={18} />
            </button>
            <button className="p-2 rounded-full bg-zinc-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-200 text-gray-400 hover:text-white">
              <Phone size={18} />
            </button>
            <button className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200">
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="py-2">
          {filteredChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&auto=format"
                alt="Your Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/50 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-100">You</p>
              <p className="text-xs text-purple-400">Online</p>
            </div>
          </div>
          <button className="p-2 rounded-full text-gray-400 hover:text-purple-400 hover:bg-zinc-800 transition-all duration-200">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatListSection;
