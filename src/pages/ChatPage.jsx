import ChatListSection from "../components/ChatListSection";
import ActiveChatArea from "../components/ActiveChatArea";

const ChatPage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 p-3">
      <div className="flex h-full space-x-3">
        <ChatListSection />
        <ActiveChatArea />
      </div>
    </div>
  );
};

export default ChatPage;
