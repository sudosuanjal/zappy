import ChatListSection from "./components/ChatListSection";
import ActiveChatArea from "./components/ActiveChatArea";
import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<ChatPage />} />
      </Routes>
    </>
  );
};

export default App;
