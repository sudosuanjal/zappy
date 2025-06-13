"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import LoginCard from "../components/LoginCard";
import { useAuth } from "../store/auth.store";

const LoginPage = () => {
  const [session, setSession] = useState(null);
  const { user, loginFn } = useAuth();
  console.log("here at login");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) await loginFn();
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log("from login card");
  console.log(user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;
