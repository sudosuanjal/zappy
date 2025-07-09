import { Route, Routes, Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import UsernameCardPage from "./pages/UsernameCardPage";
import { useAuth } from "./store/auth.store";

const INTENDED_DESTINATION_KEY = "zappy_intended_destination";

const App = () => {
  const { checkAuthFn, isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkAuthFn();
  }, [checkAuthFn]);

  // Store intended destination when user is not authenticated
  useEffect(() => {
    if (
      !isAuthenticated &&
      !isLoading &&
      location.pathname !== "/login" &&
      location.pathname !== "/login/username"
    ) {
      console.log("Setting intended destination:", location.pathname);
      sessionStorage.setItem(INTENDED_DESTINATION_KEY, location.pathname);
    }
  }, [isAuthenticated, isLoading, location.pathname]);

  // Clear intended destination when user reaches their destination
  useEffect(() => {
    if (isAuthenticated && user?.username) {
      const intended = sessionStorage.getItem(INTENDED_DESTINATION_KEY);
      if (intended && location.pathname === intended) {
        console.log(
          "Clearing intended destination - user reached:",
          location.pathname
        );
        sessionStorage.removeItem(INTENDED_DESTINATION_KEY);
      }
    }
  }, [isAuthenticated, user?.username, location.pathname]);

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

  const getRedirectPath = () => {
    const intendedDestination = sessionStorage.getItem(
      INTENDED_DESTINATION_KEY
    );
    const path = intendedDestination || location.state?.from || "/chat";
    console.log(
      "getRedirectPath called from:",
      location.pathname,
      "intendedDestination:",
      intendedDestination,
      "location.state?.from:",
      location.state?.from,
      "returning:",
      path
    );
    return path;
  };

  console.log(
    "App render - location:",
    location.pathname,
    "isAuthenticated:",
    isAuthenticated,
    "user?.username:",
    user?.username
  );

  return (
    <Routes>
      {/* Redirect logged-in users away from login page */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            user?.username ? (
              <Navigate to={getRedirectPath()} replace />
            ) : (
              <Navigate
                to="/login/username"
                state={{ from: getRedirectPath() }}
                replace
              />
            )
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Username setup: only if logged in and no username */}
      <Route
        path="/login/username"
        element={
          isAuthenticated ? (
            user?.username ? (
              <Navigate to={getRedirectPath()} replace />
            ) : (
              <UsernameCardPage />
            )
          ) : (
            <Navigate to="/login" state={{ from: getRedirectPath() }} replace />
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
              <Navigate
                to="/login/username"
                state={{ from: location.pathname }}
                replace
              />
            )
          ) : (
            <Navigate to="/login" state={{ from: location.pathname }} replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
};

export default App;
