import { useAuth } from "../../store/auth.store";

const MessageBubble = ({ message, refProp }) => {
  const { user } = useAuth();
  return (
    <div
      className={`flex ${
        message.receiverId === user._id ? "justify-start" : "justify-end"
      } mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md ${
          message.receiverId === user._id
            ? "bg-zinc-800/80 text-gray-100 border border-zinc-700"
            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
        } rounded-2xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm shadow-lg`}
      >
        {message.image ? (
          <div>
            {message.text && (
              <p className="mb-3 text-gray-100 font-medium">{message.text}</p>
            )}
            <div className="grid grid-cols-2 gap-2">
              <img
                key={index}
                src={message.image || "/placeholder.svg"}
                alt={message._id}
                className="w-full h-20 object-cover rounded-lg border border-zinc-700 hover:scale-105 transition-transform duration-200 cursor-pointer hover:shadow-md hover:shadow-purple-500/20"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-100 font-medium">{message.text}</p>
        )}

        {refProp && <div ref={refProp} />}
      </div>
    </div>
  );
};

export default MessageBubble;
