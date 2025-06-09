import LeftSidebar from "./components/LeftSidebar";
import ChatListSection from "./components/ChatListSection";
import ActiveChatArea from "./components/ActiveChatArea";

const App = () => {
  return (
    <div
      className="h-screen bg-gray-900 p-3"
      style={{ backgroundColor: "#efefef" }}
    >
      <div className="flex h-full space-x-3">
        <LeftSidebar />

        <ChatListSection />

        <ActiveChatArea />
      </div>
    </div>
  );
};

export default App;
