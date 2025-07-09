import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import LoginCard from "../components/LoginCard";
import { useAuth } from "../store/auth.store";
import { useLocation } from "react-router";

const LoginPage = () => {
  const [session, setSession] = useState(null);
  const { user, loginFn } = useAuth();
  const location = useLocation();

  // Get the original destination from the location state
  const from = location.state?.from || "/chat";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        try {
          await loginFn();
          console.log("Login successful, original destination:", from);
        } catch (err) {
          console.error("Login failed:", err);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [loginFn, from]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;
