import { User } from "lucide-react";
import { useState } from "react";

const UsernameCard = () => {
  const [error, setError] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [username, setUsername] = useState("");

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    try {
      setUsernameLoading(true);
      setError("");

      console.log("Username submitted:", username);
    } catch (error) {
      setError(error.message);
    } finally {
      setUsernameLoading(false);
    }
  };

  return (
    <>
      {" "}
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-zinc-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
                {/* <User className="text-white" size={32} /> */}
                <img
                  src="./zappy-dup.png"
                  className="rounded-xl"
                  alt="zappy-logo"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-100 mb-2">
                Choose Your Username
              </h1>
              <p className="text-gray-400">
                Create a unique username to complete your profile
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Username Form */}
            <form onSubmit={handleUsernameSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  disabled={usernameLoading}
                />
              </div>

              <button
                type="submit"
                disabled={usernameLoading || !username.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {usernameLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="text-lg">Continue</span>
                )}
              </button>
            </form>

            {/* Sign Out Option */}
            <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-200"
              >
                Sign out instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsernameCard;
