import { useNavigate } from "react-router";
import { useChat } from "../../store/chat.store";

const ChatItem = ({ user }) => {
  const { activeUser, setActiveUser } = useChat();
  const navigate = useNavigate();
  const handleUserClick = (user) => {
    setActiveUser(user);
    navigate(`/chat/${user._id}`);
  };
  return (
    <div
      onClick={() => handleUserClick(user)}
      className={`flex items-center p-4 cursor-pointer transition-all duration-200 rounded-xl mx-2 mb-2  border border-purple-500/30 ${
        activeUser?._id === user._id
          ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 "
          : "hover:bg-zinc-800/50"
      }`}
    >
      <div className="relative">
        <img
          src={user.profilePic || "/placeholder.png"}
          alt={user.fullName}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/30 shadow-lg"
        />
        {user.online && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900 animate-pulse"></div>
        )}
      </div>

      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-100 truncate">
            {user.fullName}
          </h3>
          <span className="text-xs text-gray-400">{user.time}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-400 truncate">
            {user.lastMessage || "hello, where are you!"}
          </p>
          {user.unread > 0 && (
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs rounded-full px-2 py-1 ml-2 shadow-lg shadow-purple-500/20">
              {user.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
