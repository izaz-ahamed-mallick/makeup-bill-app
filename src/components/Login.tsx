import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-blush/20 px-4">

      <div
        className="
        w-full
        max-w-md
        backdrop-blur-xl
        bg-white/90
        border border-brand-blush
        rounded-3xl
        shadow-[0_30px_60px_rgba(0,0,0,0.15)]
        p-8
      "
      >

        {/* Brand */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-[Great_Vibes] text-brand-rose">
            Puja's Touch
          </h1>

          <p className="text-xs uppercase tracking-[0.25em] text-brand-text/70 mt-2">
            Luxury Bridal Makeup
          </p>

        </div>

        <h2 className="text-xl font-semibold text-center mb-6 text-brand-text">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div className="relative">

            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              w-full
              pl-10 pr-4 py-3
              border border-brand-blush
              rounded-xl
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-brand-rose
            "
            />

          </div>

          {/* Password */}
          <div className="relative">

            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
              w-full
              pl-10 pr-10 py-3
              border border-brand-blush
              rounded-xl
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-brand-rose
            "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs text-center">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            py-3
            rounded-xl
            text-white
            text-sm
            font-medium
            bg-gradient-to-r from-brand-rose to-pink-500
            hover:shadow-lg
            transition
          "
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;
