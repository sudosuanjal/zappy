import { Search } from "lucide-react";

const ChatSearchBar = ({ searchQuery, setSearchQuery }) => (
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
);

export default ChatSearchBar;
