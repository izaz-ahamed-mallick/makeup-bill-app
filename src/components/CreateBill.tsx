import { useForm } from "react-hook-form";
import SectionHeader from "./Ui/SectionHeader";
import PremiumInput from "./Ui/PremiumInput";
import PremiumRadio from "./Ui/PremiumRadio";
import PremiumCheckbox from "./Ui/PremiumCheckbox";
import { useEffect, useState } from "react";
import ConfirmModal from "./Ui/ConfirmModal";


const CreateBill = () => {
  const { register, watch, setValue, handleSubmit } = useForm();
  const [showConfirm, setShowConfirm] = useState(false);
  const selectedService = watch("service");
  const total = watch("total");
  const discount = watch("discount");
  const advanced = watch("advanced");
  useEffect(() => {
    const totalNum = parseFloat(total) || 0;
    const discountNum = parseFloat(discount) || 0;
    const advancedNum = parseFloat(advanced) || 0;

    let calculatedDue = totalNum - discountNum - advancedNum;

    // Prevent negative values
    if (calculatedDue < 0) {
      calculatedDue = 0;
    }

    setValue("due", calculatedDue.toString());
  }, [total, discount, advanced, setValue]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const onSubmit = (data: any) => {
    console.log("Generated Bill Data:", data);
  };

  return (
    <div className="py-10 sm:py-16">

      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 sm:p-12 border border-brand-blush">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-rose font-[Playfair Display]">
            Puja’s Touch
          </h2>
          <p className="text-brand-text uppercase tracking-[0.2em] text-xs sm:text-sm mt-3 opacity-70">
            Luxury Bridal Billing Form
          </p>
          <div className="w-24 h-[2px] bg-brand-gold mx-auto mt-4"></div>
        </div>

        {/* Client Info */}
        <SectionHeader title="Client Information" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-16">
          <PremiumInput label="Client Name" register={register("name")} />
          <PremiumInput label="Location / Address" register={register("address")} />
          <PremiumInput label="Date" type="date" register={register("date")} />
          <PremiumInput label="Time" type="time" register={register("time")} />
          <PremiumInput label="Phone Number" register={register("phone")} className="md:col-span-2" />
        </div>

        {/* Services */}
        <SectionHeader title="Services" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {["Bridal", "Reception", "Semi Bridal", "Party Makeup", "Other"].map((s) => (
            <PremiumRadio
              key={s}
              label={s}
              value={s}
              register={register("service")}
            />
          ))}
        </div>

        {selectedService === "Other" && (
          <PremiumInput
            label="Enter Custom Service"
            register={register("otherService")}
            className="mb-12"
          />
        )}
        {/* Makeup Type */}
        {selectedService && !(selectedService === "Other") && (
          <>
            <SectionHeader title="Makeup Type" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 sm:mb-16">
              {[
                "HD",
                "NON HD",
                "Waterproof",
                "Sweatproof & Waterproof",
              ].map((type) => (
                <PremiumRadio
                  key={type}
                  label={type}
                  value={type}
                  register={register("makeupType")}
                />
              ))}
            </div>
          </>
        )}

        {/* Payment */}
        <SectionHeader title="Payment Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">

          <PremiumInput
            label="Total Package"
            register={register("total")}
            currency
          />

          <PremiumInput
            label="Discount"
            register={register("discount")}
            currency
          />

          <PremiumInput
            label="Advanced Paid"
            register={register("advanced")}
            currency
          />

          <div className="relative">
            <div className="w-full min-h-[56px] rounded-2xl border border-brand-gold bg-brand-blush/40 pl-4 pr-4 pt-6 pb-2 text-brand-text font-medium flex items-center">
              <span className="text-brand-rose pr-1"> ₹ </span>{formatCurrency(parseFloat(watch("due")) || 0).replace("₹", "")}
            </div>
            <label className="absolute left-4 top-2 text-sm text-brand-rose">
              Due Amount
            </label>
          </div>

        </div>

        <div className="flex flex-wrap gap-6 mb-14">
          <PremiumCheckbox label="Cash" register={register("cash")} />
          <PremiumCheckbox label="UPI" register={register("upi")} />
        </div>
        {/* Generate Button */}
        <div className="mt-10 sm:mt-14 flex justify-center sm:justify-end">
          <button
            type="submit"
            onClick={() => setShowConfirm(true)}
            className="w-full sm:w-auto min-h-[56px] px-10 py-4 rounded-full bg-gradient-to-r from-brand-rose to-pink-500 text-white font-medium tracking-wide shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Generate Bill
          </button>
        </div>
      </div>
      <ConfirmModal
        open={showConfirm}
        title="Confirm Bill Generation"
        message="Please review all details carefully before generating the bill. Once generated, changes cannot be undone."
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          handleSubmit(onSubmit)();
        }}
      />
    </div>
  );
};

export default CreateBill;
