import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import LoginCard from "../components/LoginCard";
import { useAuth } from "../store/auth.store";
import { useLocation, useNavigate } from "react-router";

const LoginPage = () => {
  const [session, setSession] = useState(null);
  const { user, loginFn } = useAuth();
  const location = useLocation(); // ✅ Use this
  const navigate = useNavigate();

  const from = location.state?.from || "/chat"; // ✅ Access state from location

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
          console.log("after loginFN: " + from);

          navigate(from, { replace: true }); // ✅ Navigates to the original path
        } catch (err) {
          console.error("Login failed:", err);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;
