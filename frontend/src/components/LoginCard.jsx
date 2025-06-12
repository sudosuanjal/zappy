import { Chrome, MessageCircle, Zap } from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../store/auth.store";

const LoginCard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {} = useAuth();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        // options: {
        //   redirectTo: `${window.location.origin}/login`,
        // },
      });

      if (error) throw error;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-zinc-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
            <img
              src="./zappy-dup.png"
              className="rounded-xl"
              alt="zappy-logo"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Welcome To Zappy
          </h1>
          <p className="text-gray-400">
            Sign in to continue to your conversations
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Chrome
              className="text-gray-700 group-hover:text-gray-900 transition-colors"
              size={20}
            />
          )}
          <span className="text-lg">
            {loading ? "Signing in..." : "Continue with Google"}
          </span>
        </button>

        {/* Features */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                <MessageCircle className="text-purple-400" size={18} />
              </div>
              <span className="text-xs text-gray-400">Secure Chat</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                <Zap className="text-green-400" size={18} />
              </div>
              <span className="text-xs text-gray-400">Real-time</span>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </>
  );
};

export default LoginCard;
