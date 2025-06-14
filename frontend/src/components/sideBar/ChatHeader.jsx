import { Plus, Phone, Video } from "lucide-react";
import ChatSearchBar from "./ChatSearchBar";

const ChatHeader = ({ searchQuery, setSearchQuery }) => (
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

    <ChatSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  </div>
);

export default ChatHeader;
