import { MoreVertical } from "lucide-react";
import { useAuth } from "../../store/auth.store";

const ChatFooter = () => {
  const { user, onlineUsers } = useAuth();
  return (
    <div className="p-4 border-t border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={user?.profilePic}
              alt="Your Profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/50 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-100">
              {user?.fullName}
            </p>
            {onlineUsers?.includes(user?._id) ? (
              <p className="text-xs text-purple-400">Online</p>
            ) : (
              <p className="text-xs text-purple-400">Online</p>
            )}
          </div>
        </div>
        <button className="p-2 rounded-full text-gray-400 hover:text-purple-400 hover:bg-zinc-800 transition-all duration-200">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatFooter;
