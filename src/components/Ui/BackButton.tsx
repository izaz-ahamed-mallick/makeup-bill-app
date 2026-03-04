import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blush bg-white/70 backdrop-blur-sm text-brand-text text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-300"
    >
      {/* Arrow Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>

      Back
    </button>
  );
};

export default BackButton;
