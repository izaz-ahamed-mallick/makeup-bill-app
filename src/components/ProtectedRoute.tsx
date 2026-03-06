import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const ProtectedRoute = ({ children }: any) => {

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-blush/20">

        <div className="flex flex-col items-center gap-6">

          {/* Logo */}
          <div className="relative">

            <img
              src="/logo.png"
              alt="Puja's Touch"
              className="w-20 h-20 object-contain animate-pulse"
            />

            {/* glow */}
            <div className="absolute inset-0 rounded-full bg-brand-gold/30 blur-2xl animate-pulse"></div>

          </div>

          {/* Brand */}
          <div className="text-center">

            <h1 className="text-3xl font-[Great_Vibes] text-brand-rose">
              Puja's Touch
            </h1>

            <p className="text-xs tracking-[0.3em] uppercase text-brand-text/60 mt-1">
              Luxury Bridal Makeup
            </p>

          </div>

          {/* Loader */}
          <div className="flex gap-2">

            <span className="w-2 h-2 bg-brand-rose rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-brand-rose rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-brand-rose rounded-full animate-bounce [animation-delay:0.4s]"></span>

          </div>

        </div>

      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
