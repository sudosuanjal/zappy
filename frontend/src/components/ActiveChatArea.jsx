"use client";

import { Mic, MoreHorizontal, Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "../store/chat.store";
import MessageBubble from "./chat/MessageBubble";

const ActiveChatArea = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const {
    messages,
    sendMessageFn,
    activeUser,
    getMessagesFn,
    isMessageLoading,
  } = useChat();

  useEffect(() => {
    if (activeUser) {
      getMessagesFn(activeUser._id);
    }
  }, [activeUser, getMessagesFn]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessageFn(input.trim());
    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col space-y-4">
      {/* Header */}
      <div className="bg-zinc-900/90 rounded-xl shadow-xl p-4 h-16 flex items-center border border-zinc-800">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={activeUser?.profilePic}
                alt={activeUser?.fullName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/20 transition-all duration-200"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-medium text-gray-100">
                {activeUser?.fullName}
              </h3>
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
      <div className="bg-zinc-900/90 rounded-xl shadow-xl flex-1 overflow-y-auto p-6 border border-zinc-800 custom-scrollbar">
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {(messages || []).map((message, index) => {
              if (!message?.text || message.text.trim() === "") return null;

              return (
                <motion.div
                  key={message._id}
                  layout="position"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <MessageBubble
                    message={message}
                    refProp={
                      index === messages.length - 1 ? messagesEndRef : null
                    }
                  />
                </motion.div>
              );
            })}
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
