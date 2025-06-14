import { Route, Routes, Navigate } from "react-router";
import { useEffect } from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import UsernameCardPage from "./pages/UsernameCardPage";
import { useAuth } from "./store/auth.store";

const App = () => {
  const { checkAuthFn, isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    checkAuthFn();
  }, [checkAuthFn]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-purple-600 border-l-blue-600 border-r-purple-600 animate-spin"></div>
            <div className="absolute inset-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse"></div>
          </div>
          <p className="mt-4 text-gray-400 font-medium">Loading Zappy...</p>
        </div>
      </div>
    );

  return (
    <Routes>
      {/* Redirect logged-in users away from login page */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/chat" /> : <LoginPage />}
      />

      {/* Username setup: only if logged in and no username */}
      <Route
        path="/login/username"
        element={
          isAuthenticated ? (
            user?.username ? (
              <Navigate to="/chat" />
            ) : (
              <UsernameCardPage />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Main chat page: requires full login + username */}
      <Route
        path="/chat/:id?"
        element={
          isAuthenticated ? (
            user?.username ? (
              <ChatPage />
            ) : (
              <Navigate to="/login/username" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/chat" />} />
    </Routes>
  );
};

export default App;
