import { NavLink, useNavigate } from "react-router-dom";
import { CalendarDays, LogOut } from "lucide-react";
import { supabase } from "../lib/supabase";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-brand-blush shadow-sm">

      <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between gap-3">

        {/* Brand */}
        <div className="flex flex-col leading-none min-w-0">

          <h1
            className="
            text-xl sm:text-3xl
            font-[Great_Vibes]
            font-bold
            text-brand-rose
            tracking-wide
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]
            whitespace-nowrap
          "
          >
            Puja's Touch
          </h1>

          <div className="w-[90px] h-[3px] my-2 bg-brand-gold rounded-full"></div>

          <p
            className="
            text-[9px] sm:text-[11px]
            font-[Playfair_Display]
            tracking-[0.25em]
            uppercase
            text-brand-text/70
            truncate
          "
          >
            Luxury Bridal Makeup Artist
          </p>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `
              text-xs sm:text-sm font-medium transition
              px-2 py-1 rounded-md
              ${isActive
                ? "text-brand-rose"
                : "text-brand-text hover:text-brand-rose"}
              `
            }
          >
            Home
          </NavLink>

          {/* Upcoming */}
          <NavLink
            to="/upcoming-bookings"
            className="
              flex items-center gap-1.5
              px-3 sm:px-4
              py-1.5 sm:py-2
              rounded-full
              text-xs sm:text-sm
              font-medium
              text-white
              bg-gradient-to-r from-brand-rose to-pink-500
              shadow-md
              hover:shadow-lg
              hover:scale-[1.03]
              active:scale-95
              transition-all duration-300
            "
          >
            <CalendarDays size={16} />
            <span className="hidden sm:inline">Upcoming</span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-1.5
              px-3 sm:px-4
              py-1.5 sm:py-2
              rounded-full
              text-xs sm:text-sm
              font-medium
              border border-brand-rose
              text-brand-rose
              bg-white
              shadow-sm
              hover:bg-brand-rose
              hover:text-white
              hover:shadow-md
              transition-all
            "
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>

      </div>

    </div>
  );
};

export default Navbar;
