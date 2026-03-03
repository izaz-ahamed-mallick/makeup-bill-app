import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  value: string;
  register: UseFormRegisterReturn;
}

const PremiumRadio = ({ label, value, register }: Props) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="radio"
        value={value}
        {...register}
        className="hidden peer"
      />

      <div className="w-5 h-5 rounded-full border-2 border-brand-rose flex items-center justify-center peer-checked:bg-brand-rose transition">
        <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition"></div>
      </div>

      <span className="text-brand-text group-hover:text-brand-rose transition">
        {label}
      </span>
    </label>
  );
};

export default PremiumRadio;
