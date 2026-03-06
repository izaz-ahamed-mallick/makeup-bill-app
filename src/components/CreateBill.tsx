import { useFieldArray, useForm, useWatch } from "react-hook-form";
import SectionHeader from "./Ui/SectionHeader";
import PremiumInput from "./Ui/PremiumInput";
import PremiumRadio from "./Ui/PremiumRadio";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "./Ui/ConfirmModal";
import { useSnackbar } from "notistack";
import { formatCurrency } from "./formatCurrency";
import { useNavigate, useParams } from "react-router-dom";
import { createBill, getBillById, updateBill } from "../Services/billService";
import CreateBillLoader from "./Loader/CreateBillLoader";
import BackButton from "./Ui/BackButton";
import type { BillForm } from "./Types";

const CreateBill = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<BillForm>({
    defaultValues: {
      services: [{ service: "", makeup_type: "", price: "", serviceDate: "", location: "", serviceTime: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const services = useWatch({
    control,
    name: "services",
  });
  const total = watch("total_package");
  const discount = watch("discount");
  const advanced = watch("advanced");
  const fullPayment = watch("full_payment");

  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingBill, setLoadingBill] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  const previousAdvanced = useRef<string | null>(null);

  /* -------------------- Auto Total Package -------------------- */

  useEffect(() => {
    const totalPrice = services.reduce(
      (sum, service) => sum + (Number(service.price) || 0),
      0
    );

    setValue("total_package", totalPrice.toString());
  }, [services, setValue]);
  /* -------------------- Due Calculation -------------------- */

  useEffect(() => {
    const totalNum = parseFloat(total) || 0;
    const discountNum = parseFloat(discount) || 0;
    const advancedNum = parseFloat(advanced) || 0;

    if (fullPayment) {
      if (previousAdvanced.current === null) {
        previousAdvanced.current = advanced;
      }

      const finalAmount = totalNum - discountNum;

      setValue("advanced", finalAmount.toString());
      setValue("due", "0");

      return;
    }

    if (!fullPayment && previousAdvanced.current !== null) {
      setValue("advanced", previousAdvanced.current);
      previousAdvanced.current = null;
    }

    const calculatedDue = totalNum - discountNum - advancedNum;

    setValue("due", Math.max(calculatedDue, 0).toString());
  }, [total, discount, advanced, fullPayment, setValue]);

  /* -------------------- Load Bill (Edit Mode) -------------------- */

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
  }, [id, reset]);

  /* -------------------- Default Date -------------------- */

  useEffect(() => {
    if (!isEdit) {
      const today = new Date().toISOString().split("T")[0];
      setValue("confirmation_date", today);
    }
  }, [isEdit, setValue]);

  /* -------------------- Submit -------------------- */

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    const payload = {
      name: data.name,
      address: data.address,
      date: data.date,
      time: data.time,
      phone: data.phone,
      services: data.services,
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

        navigate("/latest-bookings", {
          state: { highlightId: newBill.id },
        });
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

  if (loadingBill) return <CreateBillLoader />;

  return (
    <div className="py-10 sm:py-16">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-12">

        {/* Header */}

        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-brand-rose font-[Playfair Display]">
            Puja’s Touch
          </h2>

          <p className="text-xs uppercase tracking-[0.2em] mt-3 opacity-70">
            Luxury Bridal Billing Form
          </p>
        </div>

        {/* Client Info */}

        <SectionHeader title="Client Information" />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <PremiumInput label="Client Name" register={register("name")} />
          <PremiumInput label="Location / Address" register={register("address")} />
          <PremiumInput label="Date" type="date" register={register("date")} />
          <PremiumInput label="Time" type="time" register={register("time")} />
          <PremiumInput label="Phone Number" register={register("phone")} className="md:col-span-2" />
        </div>

        {/* Services */}

        <SectionHeader title="Services" />

        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-xl p-6 mb-6 bg-white">

            {/* Service title */}
            <h3 className="font-semibold text-brand-rose mb-6 text-lg">
              {index === 0 ? "Primary Service" : `Service ${index + 1}`}
            </h3>

            {/* Service Selection */}
            <p className="text-sm text-gray-500 mb-3 font-medium">Select Service</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {["Bridal", "Reception", "Semi Bridal", "Party Makeup"].map((s) => (
                <PremiumRadio
                  key={s}
                  label={s}
                  value={s}
                  register={register(`services.${index}.service` as const)}
                />
              ))}
            </div>

            {/* Makeup Type */}
            <p className="text-sm text-gray-500 mb-3 font-medium">
              Makeup Type
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {["HD", "NON HD", "Waterproof", "Sweatproof & Waterproof"].map((type) => (
                <PremiumRadio
                  key={type}
                  label={type}
                  value={type}
                  register={register(`services.${index}.makeup_type` as const)}
                />
              ))}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <PremiumInput
                label="Service Date"
                type="date"
                register={register(`services.${index}.serviceDate` as const)}
              />

              <PremiumInput
                label="Service Time"
                type="time"
                register={register(`services.${index}.serviceTime` as const)}
              />

              <PremiumInput
                label="Service Location"
                register={register(`services.${index}.location` as const)}
                className="md:col-span-2"
              />

              <PremiumInput
                label="Package Price"
                register={register(`services.${index}.price` as const)}
                currency
                className="md:col-span-2"
              />

            </div>

            {/* Remove button */}
            {fields.length > 1 && index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 mt-4 text-sm"
              >
                Remove Service
              </button>
            )}

          </div>
        ))}

        {/* Add Service button */}
        <div className="flex justify-center mb-12">
          <button
            type="button"
            onClick={() => append({ service: "", makeup_type: "", price: "", serviceDate: "", location: "", serviceTime: "" })}
            className="bg-brand-rose hover:bg-brand-rose/90 text-white px-8 py-3 rounded-full font-medium transition"
          >
            + Add Another Service
          </button>
        </div>

        {/* Payment */}

        <SectionHeader title="Payment Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">

          <PremiumInput
            label="Total Package"
            register={register("total_package")}
            currency
            readOnly
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

          {/* Full Payment Toggle */}
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

          {/* Due Amount */}
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
                  {formatCurrency(Number(watch("due") || 0)).replace("₹", "")}
                </>
              )}
            </div>

            <label className="absolute left-4 top-2 text-sm text-brand-rose">
              Due Amount
            </label>
          </div>

        </div>

        {/* Payment Mode */}

        <div className="flex gap-6 mb-14">
          <PremiumRadio label="Cash" value="Cash" register={register("payment_mode")} />
          <PremiumRadio label="UPI" value="UPI" register={register("payment_mode")} />
        </div>

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

        {/* Submit */}

        <div className="flex justify-end">
          <button
            type="button"
            disabled={submitting}
            onClick={() => setShowConfirm(true)}
            className="px-10 py-4 rounded-full bg-brand-rose text-white"
          >
            {isEdit ? "Update Bill" : "Generate Bill"}
          </button>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        title="Confirm Bill Generation"
        message="Please review all details carefully before generating the bill."
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
