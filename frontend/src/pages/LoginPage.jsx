"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Chrome, MessageCircle } from "lucide-react";
import LoginCard from "../components/LoginCard";
import UsernameCard from "../components/UsernameCard";

const LoginPage = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log(session?.access_token);

  if (session && !session.user?.user_metadata?.username) {
    return <UsernameCard />;
  }

  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center p-4">
        <div className="bg-zinc-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-400 mb-6">You're successfully logged in.</p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-6 py-3 bg-zinc-800 text-gray-300 rounded-xl hover:bg-zinc-700 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;
