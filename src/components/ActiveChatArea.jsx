"use client";

import {
  Mic,
  MoreHorizontal,
  Paperclip,
  Pause,
  Play,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

const initialMessages = [
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
];

const ActiveChatArea = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = {
      id: Date.now(),
      text: input.trim(),
      incoming: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const MessageBubble = ({ message }) => (
    <div
      className={`flex ${
        message.incoming ? "justify-start" : "justify-end"
      } mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md ${
          message.incoming
            ? "bg-zinc-800/80 text-gray-100 border border-zinc-700"
            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
        } rounded-2xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm shadow-lg`}
      >
        {message.audio ? (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                message.incoming
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                  : "bg-zinc-800 text-white shadow-lg"
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
                      message.incoming ? "bg-zinc-400" : "bg-white/70"
                    } rounded-full transition-all duration-200`}
                    style={{
                      height: `${Math.random() * 20 + 5}px`,
                      animationDelay: `${i * 0.05}s`,
                      animation: isPlaying ? "pulse 1s infinite" : "none",
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <span
              className={`text-xs font-medium ${
                message.incoming ? "text-gray-300" : "text-white"
              }`}
            >
              {message.duration}
            </span>
          </div>
        ) : message.images ? (
          <div>
            <p className="mb-3 text-gray-100 font-medium">{message.text}</p>
            <div className="grid grid-cols-2 gap-2">
              {message.images.map((img, index) => (
                <img
                  key={index}
                  src={img || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg border border-zinc-700 hover:scale-105 transition-transform duration-200 cursor-pointer hover:shadow-md hover:shadow-purple-500/20"
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-100 font-medium">{message.text}</p>
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col space-y-4">
      {/* Header */}
      <div className="bg-zinc-900/90 rounded-xl shadow-xl p-4 h-16 flex items-center border border-zinc-800">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format"
                alt="Bella Huffman"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/20 transition-all duration-200"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-medium text-gray-100">Bella Huffman</h3>
              <p className="text-sm text-purple-400 font-medium">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm text-gray-300 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors duration-200">
              Profile
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-full hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200">
              Call
            </button>
            <MoreHorizontal
              className="text-gray-400 cursor-pointer hover:text-purple-400 transition-colors duration-200"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* Messages Section */}
      <div className="bg-zinc-900/90 rounded-xl shadow-xl flex-1 overflow-y-auto p-6 border border-zinc-800 scrollbar-hide">
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                layout="position"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <MessageBubble message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Area */}
      <div className="h-16 flex items-center">
        <div className="flex items-center w-full gap-3">
          <div className="bg-zinc-900/90 rounded-xl shadow-xl p-4 h-16 flex items-center flex-1 px-4 border border-zinc-800">
            <Paperclip
              size={18}
              className="text-gray-500 mr-2 hover:text-purple-400 transition-colors duration-200"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Write messages..."
              className="flex-1 text-sm text-gray-300 placeholder-gray-500 bg-transparent focus:outline-none"
            />
          </div>

          <button className="bg-zinc-900/90 rounded-xl shadow-xl p-4 h-16 flex items-center justify-center border border-zinc-800 hover:bg-zinc-800 transition-colors duration-200">
            <Mic
              size={18}
              className="text-gray-500 hover:text-purple-400 transition-colors duration-200"
            />
          </button>

          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-xl p-4 h-16 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveChatArea;
