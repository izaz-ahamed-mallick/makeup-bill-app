import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  register: UseFormRegisterReturn;
  type?: string;
  className?: string;
  readOnly?: boolean;
  currency?: boolean;
  style?: any;
}

const PremiumInput = ({
  label,
  register,
  type = "text",
  className,
  readOnly,
  currency = false,
  style
}: Props) => {

  const isDateOrTime = type === "date" || type === "time";

  return (
    <div className={`relative w-full ${className}`}>

      {/* Currency Symbol */}
      {currency && (
        <span className="absolute left-4 top-[28px] text-brand-rose font-medium text-sm">
          ₹
        </span>
      )}

      <input
        type={type}
        {...register}
        readOnly={readOnly}
        style={style}
        placeholder={isDateOrTime ? undefined : " "}
        className={`
        peer w-full
        min-h-[56px]
        rounded-2xl
        border border-brand-blush
        bg-white/70
        ${currency ? "pl-7" : "pl-4"}
        ${isDateOrTime ? "pt-6 pb-2" : "pt-6 pb-2"}
        text-brand-text
        focus:outline-none
        focus:ring-2
        focus:ring-brand-rose
        transition-all
      `}
      />

      <label
        className={`
        absolute left-4
        ${isDateOrTime ? "top-2 text-sm text-brand-rose" : "top-2 text-sm text-gray-400"}
        transition-all
        pointer-events-none

        ${!isDateOrTime && `
          peer-placeholder-shown:top-4
          peer-placeholder-shown:text-base
          peer-focus:top-2
          peer-focus:text-sm
          peer-focus:text-brand-rose
        `}
      `}
      >
        {label}
      </label>

    </div>
  );
};

export default PremiumInput;
