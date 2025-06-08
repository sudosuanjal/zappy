import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Phone,
  Paperclip,
  Mic,
  Send,
  Mail,
  Calendar,
  Bell,
  Trash2,
  User,
  Diamond,
  Play,
  Pause,
} from "lucide-react";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const pinnedContacts = [
    {
      id: 1,
      name: "Ariya Goulding",
      message: "Have a good day, Roman!",
      time: "10:27 AM",
      unread: 1,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=40&h=40&fit=crop&crop=face&auto=format",
    },
    {
      id: 2,
      name: "Omari Norris",
      message: "Hi, good to hear from you. It's bee...",
      time: "9:48 AM",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    },
    {
      id: 3,
      name: "Bella Huffman",
      message: "Wow, that looks amazing.",
      time: "10:32 AM",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format",
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
    },
    {
      id: 5,
      name: "Marcus King",
      message: "I'm ready to buy this thing, but I h...",
      time: "9:48 AM",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    },
    {
      id: 6,
      name: "Chloe Hayes",
      message: "Hi! My order arrived yest",
      time: "8:20 AM",
      unread: 1,
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face&auto=format",
    },
    {
      id: 7,
      name: "Tony Elston",
      message: "🎨🎨🎨 Images",
      time: "8:56 AM",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&auto=format",
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
    },
  ];

  const messages = [
    {
      id: 1,
      text: "How about these pictures?",
      incoming: true,
      time: "5:12 PM",
      images: [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=150&h=150&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=150&h=150&fit=crop&auto=format",
      ],
    },
    {
      id: 2,
      text: "Okay, it's almost ready.",
      incoming: false,
      time: "5:12 PM",
    },
    {
      id: 3,
      text: "Looks cool, can you find more options?",
      incoming: false,
      time: "5:12 PM",
    },
    {
      id: 4,
      text: "Sure, but I'm busy right now.",
      incoming: true,
      time: "5:12 PM",
    },
    {
      id: 5,
      audio: true,
      duration: "0:24",
      incoming: true,
      time: "5:12 PM",
    },
  ];

  const ContactItem = ({ contact }) => (
    <div
      className={`flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
        contact.inactive ? "opacity-50" : ""
      }`}
    >
      <div className="relative">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        {contact.name === "Bella Huffman" && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {contact.name}
          </h3>
          <span className="text-xs text-gray-500">{contact.time}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{contact.message}</p>
      </div>
      {contact.unread > 0 && (
        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-medium">
            {contact.unread}
          </span>
        </div>
      )}
    </div>
  );

  const MessageBubble = ({ message }) => (
    <div
      className={`flex ${
        message.incoming ? "justify-start" : "justify-end"
      } mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md ${
          message.incoming ? "bg-gray-100" : "bg-orange-500 text-white"
        } rounded-2xl px-4 py-2`}
      >
        {message.audio ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.incoming
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-500"
              }`}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <div className="flex-1 h-8 flex items-center">
              <div className="flex space-x-0.5 items-center h-full">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-0.5 ${
                      message.incoming ? "bg-gray-400" : "bg-white"
                    } rounded-full`}
                    style={{ height: `${Math.random() * 20 + 5}px` }}
                  ></div>
                ))}
              </div>
            </div>
            <span
              className={`text-xs ${
                message.incoming ? "text-gray-600" : "text-white"
              }`}
            >
              {message.duration}
            </span>
          </div>
        ) : message.images ? (
          <div>
            <p
              className={`mb-2 ${
                message.incoming ? "text-gray-800" : "text-white"
              }`}
            >
              {message.text}
            </p>
            <div className="grid grid-cols-2 gap-1">
              {message.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        ) : (
          <p className={message.incoming ? "text-gray-800" : "text-white"}>
            {message.text}
          </p>
        )}
        {!message.incoming && (
          <div className="flex justify-end mt-1">
            <div className="flex space-x-0.5">
              <div className="w-3 h-3 border-b-2 border-r-2 border-white transform rotate-45 opacity-60"></div>
              <div className="w-3 h-3 border-b-2 border-r-2 border-white transform rotate-45"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="h-screen bg-gray-900 p-3"
      style={{ backgroundColor: "#1a1b3e" }}
    >
      <div className="flex h-full space-x-3">
        {/* Left Sidebar */}
        <div
          className="w-48 bg-gray-900 rounded-xl p-4 flex flex-col"
          style={{ backgroundColor: "#0f1419" }}
        >
          <div className="flex items-center space-x-2 mb-8">
            <Diamond className="text-orange-500" size={24} />
            <span className="text-white font-semibold text-lg">Chat</span>
          </div>
          <div className="flex flex-col space-y-6 flex-1">
            <Mail
              className="text-white hover:text-orange-500 cursor-pointer transition-colors"
              size={24}
            />
            <Calendar
              className="text-white hover:text-orange-500 cursor-pointer transition-colors"
              size={24}
            />
            <Bell
              className="text-white hover:text-orange-500 cursor-pointer transition-colors"
              size={24}
            />
            <Trash2
              className="text-white hover:text-orange-500 cursor-pointer transition-colors"
              size={24}
            />
          </div>
          <User
            className="text-white hover:text-orange-500 cursor-pointer transition-colors mt-auto"
            size={24}
          />
        </div>

        {/* Chat List Section */}
        <div className="w-80 bg-white rounded-xl shadow-lg flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <Plus className="text-white" size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format"
                    alt="Bella Huffman"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Bella Huffman</h3>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Profile
                </button>
                <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors">
                  Call
                </button>
                <MoreHorizontal
                  className="text-gray-400 cursor-pointer hover:text-gray-600"
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* Pinned Section */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                PINNED
              </h4>
              {pinnedContacts.map((contact) => (
                <ContactItem key={contact.id} contact={contact} />
              ))}
            </div>

            {/* All Section */}
            <div className="p-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                ALL
              </h4>
              {allContacts.map((contact) => (
                <ContactItem key={contact.id} contact={contact} />
              ))}
            </div>
          </div>
        </div>

        {/* Active Chat Area */}
        <div className="flex-1 bg-white rounded-xl shadow-lg flex flex-col">
          {/* Date Header */}
          <div className="p-4 border-b border-gray-100 text-center">
            <span className="text-sm text-gray-500">10 June, 2022</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <Paperclip
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                size={20}
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Write messages..."
                  className="w-full px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <Mic
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                size={20}
              />
              <button className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Send className="text-white" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
