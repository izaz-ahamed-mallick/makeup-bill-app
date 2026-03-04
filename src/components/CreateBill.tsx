import { useForm } from "react-hook-form";
import SectionHeader from "./Ui/SectionHeader";
import PremiumInput from "./Ui/PremiumInput";
import PremiumRadio from "./Ui/PremiumRadio";
import PremiumCheckbox from "./Ui/PremiumCheckbox";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "./Ui/ConfirmModal";
import { supabase } from "../lib/supabase";
import { useSnackbar } from "notistack";
import { formatCurrency } from "./formatCurrency";
import { useNavigate, useParams } from "react-router-dom";
import { createBill, getBillById, updateBill } from "../Services/billService";
import CreateBillLoader from "./Loader/CreateBillLoader";
import BackButton from "./Ui/BackButton";


const CreateBill = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const { register, watch, setValue, handleSubmit, formState: { errors }, reset } = useForm();
  const [showConfirm, setShowConfirm] = useState(false);
  const selectedService = watch("service");
  const total = watch("total_package");
  const discount = watch("discount");
  const advanced = watch("advanced");
  const fullPayment = watch("full_payment");

  const [loadingBill, setLoadingBill] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const previousAdvanced = useRef<string | null>(null);

  useEffect(() => {
    const totalNum = parseFloat(total) || 0;
    const discountNum = parseFloat(discount) || 0;
    const advancedNum = parseFloat(advanced) || 0;

    if (fullPayment) {
      // Save previous advanced value before overriding
      if (previousAdvanced.current === null) {
        previousAdvanced.current = advanced;
      }

      const finalAmount = totalNum - discountNum;

      setValue("advanced", finalAmount.toString());
      setValue("due", "0");

      return;
    }

    // Restore previous advanced value when unchecked
    if (!fullPayment && previousAdvanced.current !== null) {
      setValue("advanced", previousAdvanced.current);
      previousAdvanced.current = null;
    }

    const calculatedDue = totalNum - discountNum - advancedNum;

    setValue("due", Math.max(calculatedDue, 0).toString());

  }, [total, discount, advanced, fullPayment, setValue]);

  useEffect(() => {
    if (!id) return;

    const loadBill = async () => {
      try {
        setLoadingBill(true);

        const data = await getBillById(Number(id));

        reset(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoadingBill(false);
      }
    };

    loadBill();
  }, [id, setValue]);

  useEffect(() => {
    if (!isEdit) {
      const today = new Date().toISOString().split("T")[0];
      setValue("confirmation_date", today);
    }
  }, [isEdit, setValue]);



  const onSubmit = async (data: any) => {
    setSubmitting(true);
    const payload = {
      name: data.name,
      address: data.address,
      date: data.date,
      time: data.time,
      phone: data.phone,
      service: data.service,
      makeup_type: data.makeup_type,
      total_package: parseFloat(data.total_package) || 0,
      discount: parseFloat(data.discount) || 0,
      advanced: parseFloat(data.advanced) || 0,
      due: parseFloat(data.due) || 0,
      full_payment: data.full_payment,
      payment_mode: data.payment_mode,
      terms: data.terms,
      confirmation_date: data.confirmation_date,
      signature: data.signature,
    };

    try {
      if (isEdit) {

        await updateBill(Number(id), payload);
        enqueueSnackbar("Bill updated successfully 👑", {
          variant: "success",
        });

        navigate("/latest-bookings", { state: { highlightId: id } });
      } else {
        const newBill = await createBill(payload);

        enqueueSnackbar("Bill saved successfully 👑", {
          variant: "success",
        });

        navigate("/latest-bookings", { state: { highlightId: newBill.id } });
      }
    } catch (error) {
      console.error(error);

      enqueueSnackbar("Failed to save bill ❌", {
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingBill) {
    return <CreateBillLoader />;
  }

  return (
    <div className="py-10 sm:py-16">
      <div className="mb-6">
        <BackButton />
      </div>
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
                  register={register("makeup_type")}
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
            register={register("total_package")}
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
            readOnly={fullPayment}
            className={`${fullPayment ? "ring-2 ring-green-300 bg-green-50" : ""}`}
          />
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("full_payment")}
              className="sr-only peer"
            />

            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative transition">

              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>

            </div>

            <span className="text-sm font-medium text-brand-text">
              Full Payment Received
            </span>
          </label>

          <div className="relative">
            <div
              className={`w-full min-h-[56px] rounded-2xl border pl-4 pr-4 pt-6 pb-2 font-medium flex items-center transition-all duration-300
    ${fullPayment
                  ? "bg-green-50 border-green-300 text-green-700"
                  : "bg-brand-blush/40 border-brand-gold text-brand-text"
                }`}
            >
              {fullPayment ? (
                <span className="flex items-center gap-2 font-semibold">
                  ✓ Fully Paid
                </span>
              ) : (
                <>
                  <span className="text-brand-rose pr-1">₹</span>
                  {formatCurrency(parseFloat(watch("due")) || 0).replace("₹", "")}
                </>
              )}
            </div>

            <label className="absolute left-4 top-2 text-sm text-brand-rose">
              Due Amount
            </label>
          </div>

        </div>

        <div className="flex flex-wrap gap-6 mb-14">
          <div className="flex flex-wrap gap-6 mb-14">
            <PremiumRadio
              label="Cash"
              value="Cash"
              register={register("payment_mode")}
            />

            <PremiumRadio
              label="UPI"
              value="UPI"
              register={register("payment_mode")}
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <SectionHeader title="Terms & Conditions" />

        <div className="space-y-5 mb-12 sm:mb-16">

          <PremiumRadio
            label="Booking will be confirmed only after receiving the advance amount."
            value="advance_required"
            register={register("terms", { required: true })}
          />

          <PremiumRadio
            label="If the client cancels the booking, the advance amount will not be refunded."
            value="non_refundable"
            register={register("terms", { required: true })}
          />

        </div>
        {errors.terms && (
          <p className="text-sm text-red-500 mt-2">
            Please accept the terms before generating the bill.
          </p>
        )}

        {/* Confirmation */}
        <SectionHeader title="Confirmation" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">

          {/* Date (Auto Today) */}
          <PremiumInput
            label="Date"
            type="date"
            register={register("confirmation_date")}
            readOnly
          />

          {/* Signature */}
          <PremiumInput
            label="Owner Signature"
            register={register("signature", { required: true })}
            className="text-3xl tracking-wide"
            style={{ fontFamily: "Great Vibes, cursive" }}
          />

        </div>

        {errors.signature && (
          <p className="text-sm text-red-500 mt-2">
            Signature is required before generating the bill.
          </p>
        )}
        {/* Generate Button */}
        <div className="mt-10 sm:mt-14 flex justify-center sm:justify-end">
          <button
            type="button"
            disabled={submitting}
            onClick={() => setShowConfirm(true)}
            className={`w-full sm:w-auto min-h-[56px] px-10 py-4 rounded-full
    bg-gradient-to-r from-brand-rose to-pink-500
    text-white font-semibold tracking-wide
    flex items-center justify-center gap-3
    shadow-lg transition-all duration-300
    ${submitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-2xl hover:-translate-y-0.5"
              }`}
          >

            {submitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              `${isEdit ? "Update Bill" : "Generate Bill"}`
            )}

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
