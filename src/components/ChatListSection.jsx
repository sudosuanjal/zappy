import { MoreHorizontal, Plus, Search, Pin } from "lucide-react";

const pinnedContacts = [
  {
    id: 1,
    name: "Ariya Goulding",
    message: "Have a good day, Roman!",
    time: "10:27 AM",
    unread: 1,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    online: true,
  },
  {
    id: 2,
    name: "Omari Norris",
    message: "Hi, good to hear from you. It's bee...",
    time: "9:48 AM",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    online: false,
  },
  {
    id: 3,
    name: "Bella Huffman",
    message: "Wow, that looks amazing.",
    time: "10:32 AM",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format",
    online: true,
  },
];

const allContacts = [
  {
    id: 4,
    name: "Sherri Matthews",
    message: "Hey there, I'm having trouble open...",
    time: "11:24 AM",
    unread: 1,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face&auto=format",
    online: true,
  },
  {
    id: 5,
    name: "Marcus King",
    message: "I'm ready to buy this thing, but I h...",
    time: "9:48 AM",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    online: false,
  },
  {
    id: 6,
    name: "Chloe Hayes",
    message: "Hi! My order arrived yest",
    time: "8:20 AM",
    unread: 1,
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face&auto=format",
    online: true,
  },
  {
    id: 7,
    name: "Tony Elston",
    message: "🎨🎨🎨 Images",
    time: "8:56 AM",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&auto=format",
    online: false,
  },
  {
    id: 8,
    name: "Eleanor Pena",
    message: "",
    time: "30:00 AM",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face&auto=format",
    inactive: true,
    online: false,
  },
  {
    id: 9,
    name: "anjal",
    message: "",
    time: "30:00 AM",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face&auto=format",
    inactive: true,
    online: false,
  },
  {
    id: 10,
    name: "Ebin",
    message: "",
    time: "30:00 AM",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face&auto=format",
    inactive: true,
    online: false,
  },
];

const ContactItem = ({ contact, isPinned = false }) => (
  <div
    className={`group relative flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
      contact.inactive
        ? "opacity-50 hover:bg-gray-800/30"
        : "hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/30 hover:shadow-lg"
    } ${
      contact.unread > 0
        ? "bg-gradient-to-r from-orange-500/10 to-orange-400/5 border-l-2 border-orange-500"
        : ""
    }`}
  >
    <div className="relative">
      <div className="relative">
        <img
          src={contact.avatar}
          alt={contact.name}
          className={`w-12 h-12 rounded-full object-cover ring-2 transition-all duration-200 ${
            contact.online
              ? "ring-green-500/50 shadow-lg shadow-green-500/20"
              : "ring-gray-600/30"
          }`}
        />
        {contact.online && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
        )}
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center space-x-2">
          <h3
            className={`text-sm font-medium truncate transition-colors ${
              contact.inactive
                ? "text-gray-500"
                : "text-black group-hover:text-orange-300"
            }`}
          >
            {contact.name}
          </h3>
          {isPinned && <Pin className="w-3 h-3 text-orange-500 rotate-45" />}
        </div>
        <span className="text-xs text-gray-400">{contact.time}</span>
      </div>
      <p
        className={`text-sm truncate transition-colors ${
          contact.inactive
            ? "text-gray-600"
            : "text-gray-400 group-hover:text-gray-300"
        }`}
      >
        {contact.message || "No recent messages"}
      </p>
    </div>
    {contact.unread > 0 && (
      <div className="relative">
        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-xs text-white font-bold">{contact.unread}</span>
        </div>
        <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-25"></div>
      </div>
    )}
  </div>
);

const ChatListSection = () => {
  return (
    <div className="w-80 flex flex-col space-y-4">
      {/* Header Section */}
      <div className="bg-[#F6F6F6] rounded-xl shadow-2xl p-4 h-16 flex items-center justify-center">
        <div className="flex items-center space-x-3 w-full">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 backdrop-blur-sm"
            />
          </div>
          <button className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
            <Plus className="text-white" size={20} />
          </button>
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-[#F6F6F6] rounded-xl shadow-2xl flex-1 overflow-hidden">
        {/* Pinned Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-2">
              <Pin className="w-3 h-3 text-orange-500" />
              <span>Pinned</span>
            </h4>
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
          </div>
          <div className="space-y-2">
            {pinnedContacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} isPinned={true} />
            ))}
          </div>
        </div>

        {/* All Section */}
        <div className="p-4 overflow-y-auto scrollbar-hide max-h-96">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              All Conversations
            </h4>
            <div className="w-16 h-0.5 bg-gradient-to-r from-gray-600 to-transparent rounded-full"></div>
          </div>
          <div className="space-y-2">
            {allContacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListSection;
