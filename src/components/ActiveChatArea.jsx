import {
  Mic,
  MoreHorizontal,
  Paperclip,
  Pause,
  Play,
  Send,
} from "lucide-react";
import { useState } from "react";

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

const ActiveChatArea = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const MessageBubble = ({ message }) => (
    <div
      className={`flex ${
        message.incoming ? "justify-start" : "justify-end"
      } mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md ${
          message.incoming
            ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white border border-gray-600/30"
            : "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
        } rounded-2xl px-4 py-3 transition-all duration-200 hover:scale-[1.02]`}
      >
        {message.audio ? (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                message.incoming
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "bg-white text-orange-500 shadow-lg"
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
                      message.incoming ? "bg-gray-400" : "bg-white/70"
                    } rounded-full transition-all duration-200`}
                    style={{ height: `${Math.random() * 20 + 5}px` }}
                  ></div>
                ))}
              </div>
            </div>
            <span
              className={`text-xs font-medium ${
                message.incoming ? "text-gray-300" : "text-white/90"
              }`}
            >
              {message.duration}
            </span>
          </div>
        ) : message.images ? (
          <div>
            <p className="mb-3 text-white font-medium">{message.text}</p>
            <div className="grid grid-cols-2 gap-2">
              {message.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg border border-gray-600/30 hover:scale-105 transition-transform duration-200 cursor-pointer"
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-white font-medium">{message.text}</p>
        )}
        {!message.incoming && (
          <div className="flex justify-end mt-2">
            <div className="flex space-x-0.5">
              <div className="w-3 h-3 border-b-2 border-r-2 border-white/60 transform rotate-45"></div>
              <div className="w-3 h-3 border-b-2 border-r-2 border-white transform rotate-45"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col space-y-4">
      {/* Profile Header Section */}
      <div className="bg-[#F6F6F6] rounded-xl shadow-2xl p-4 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format"
                alt="Bella Huffman"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-green-500/50 shadow-lg shadow-green-500/20 transition-all duration-200"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-medium text-black">Bella Huffman</h3>
              <p className="text-sm text-green-400 font-medium">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm text-gray-300 hover:text-orange-300 transition-colors duration-200 hover:bg-gray-800/50 rounded-full">
              Profile
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
              Call
            </button>
            <MoreHorizontal
              className="text-gray-400 cursor-pointer hover:text-orange-300 transition-colors duration-200"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* Messages Section */}
      <div className="bg-[#F6F6F6] rounded-xl shadow-2xl flex-1 overflow-y-auto p-6 border">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Input Area Section */}
      <div className="bg-[#F6F6F6] rounded-xl shadow-2xl p-4 h-16 flex items-center ">
        <div className="flex items-center space-x-3 w-full">
          <button className="p-2 text-gray-400 hover:text-orange-300 transition-colors duration-200 hover:bg-gray-800/50 rounded-full">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Write messages..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 backdrop-blur-sm"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-orange-300 transition-colors duration-200 hover:bg-gray-800/50 rounded-full">
            <Mic size={20} />
          </button>
          <button className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
            <Send className="text-white" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveChatArea;
