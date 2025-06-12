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

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Redirect logged-in users away from login page */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
      />

      {/* Username setup: only if logged in and no username */}
      <Route
        path="/login/username"
        element={
          isAuthenticated ? (
            user?.username ? (
              <Navigate to="/" />
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
        path="/"
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
    </Routes>
  );
};

export default App;
