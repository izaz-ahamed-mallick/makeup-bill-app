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

  const isPicker = type === "date" || type === "time";

  return (
    <div className={`relative w-full ${className}`}>

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
        placeholder={isPicker ? undefined : " "}
        className={`
  peer w-full
  min-h-[56px]
  rounded-2xl
  border border-brand-blush
  bg-white/90

  shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]
  hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]

  ${currency ? "pl-7" : "pl-4"}
  pt-6 pb-2

  text-brand-text
  focus:outline-none
  focus:ring-2
  focus:ring-brand-rose/60
  focus:shadow-[0_0_0_4px_rgba(244,63,94,0.08)]

  transition-all duration-200
`}
      />

      <label
        className={`
          absolute left-4 text-sm pointer-events-none transition
          ${isPicker
            ? "top-2 text-brand-rose"
            : `
              top-1 text-gray-400
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-brand-rose
              peer-placeholder-shown:top-4
            `
          }
        `}
      >
        {label}
      </label>

    </div>
  );
};

export default PremiumInput;
