import { NavLink } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-brand-blush shadow-sm">

      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Brand */}
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-3xl font-semibold tracking-wide text-brand-rose font-[Playfair Display]">
            Puja's Touch
          </h1>

          <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-70 text-brand-text">
            Luxury Bridal Makeup Artist
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive
                ? "text-brand-rose"
                : "text-brand-text hover:text-brand-rose"
              }`
            }
          >
            Home
          </NavLink>

          {/* Upcoming Booking Button */}
          <NavLink
            to="/upcoming-bookings"
            className="
            flex items-center gap-2
            px-4 py-2
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
            Upcoming
          </NavLink>

        </div>

      </div>
    </div>
  );
};

export default Navbar;
