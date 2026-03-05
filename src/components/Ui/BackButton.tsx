import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
      group
      flex items-center gap-2
      px-4 py-2.5
      rounded-full
      bg-white/80 backdrop-blur-md
      border border-brand-blush
      shadow-md

      text-sm font-medium text-brand-text

      active:scale-95
      transition-all duration-300
      "
    >
      <span
        className="
        w-8 h-8
        flex items-center justify-center
        rounded-full
        bg-brand-blush
        text-brand-rose
        transition-transform duration-300
        group-hover:-translate-x-0.5
        "
      >
        <ArrowLeft size={16} />
      </span>

      Back
    </button>
  );
};

export default BackButton;
