import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  register: UseFormRegisterReturn;
}

const PremiumCheckbox = ({ label, register }: Props) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input type="checkbox" {...register} className="hidden peer" />

      <div className="w-5 h-5 rounded-md border-2 border-brand-gold flex items-center justify-center peer-checked:bg-brand-gold transition">
        <svg
          className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <span className="text-brand-text group-hover:text-brand-rose transition">
        {label}
      </span>
    </label>
  );
};

export default PremiumCheckbox;
