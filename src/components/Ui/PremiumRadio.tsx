import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  value: string;
  register: UseFormRegisterReturn;
}

const PremiumRadio = ({ label, value, register }: Props) => {
  return (
    <label
      className="
      relative
      flex items-center gap-3
      w-full
      min-h-[46px]
      px-3 py-2.5
      rounded-lg
      border border-transparent
      cursor-pointer
      overflow-hidden
      transition-all duration-200
      hover:bg-brand-blush/30
      group
      "
    >
      <input
        type="radio"
        value={value}
        {...register}
        className="hidden peer"
      />

      {/* soft gold glow when selected */}
      <span
        className="
        absolute inset-0
        rounded-lg
        opacity-0
        peer-checked:opacity-100
        transition duration-300
        pointer-events-none
        bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.25),transparent_70%)]
      "
      />

      {/* ripple effect */}
      <span
        className="
        absolute
        w-0 h-0
        rounded-full
        bg-brand-rose/20
        opacity-0
        group-active:w-40
        group-active:h-40
        group-active:opacity-100
        transition-all duration-500 ease-out
      "
      />

      {/* radio circle */}
      <div
        className="
        relative
        w-5 h-5
        rounded-full
        border-2 border-brand-rose
        flex items-center justify-center
        peer-checked:bg-brand-rose
        transition
        shrink-0
      "
      >
        <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition"></div>
      </div>

      {/* label */}
      <span
        className="
        relative
        text-brand-text
        text-sm
        leading-tight
        group-hover:text-brand-rose
        transition
        break-words
      "
      >
        {label}
      </span>

    </label>
  );
};

export default PremiumRadio;
