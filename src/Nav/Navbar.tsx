import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-brand-blush shadow-sm">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">

        {/* Brand */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-brand-rose font-[Playfair Display]">
            Puja's Touch
          </h1>

          <div className="w-16 h-[2px] bg-brand-gold mt-2"></div>

          <p className="text-brand-text text-xs tracking-[0.2em] uppercase opacity-70 mt-2">
            High-End Bridal Makeup
          </p>
        </div>

        {/* Minimal Navigation */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative text-sm font-medium tracking-wide transition
     ${isActive ? "text-brand-rose" : "text-brand-text hover:text-brand-rose"}`
          }
        >
          {({ isActive }) => (
            <span className="relative">
              Home
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-brand-gold transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </span>
          )}
        </NavLink>

      </div>
    </div>
  );
};

export default Navbar;
