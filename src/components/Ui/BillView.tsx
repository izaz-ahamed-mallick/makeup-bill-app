import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { formatCurrency } from "../formatCurrency";
import { supabase } from "../../lib/supabase";
import { User, Phone, MapPin, Calendar, Clock, Facebook, MessageCircle, Download, CreditCard, Brush, Sparkles, IndianRupee, Banknote, Tag, Wallet } from "lucide-react";

import BackButton from "./BackButton";
import BillViewLoader from "../Loader/BillViewLoader";
import { generateInvoiceNumber } from "../utils/getInvoice";
import { getDownloadInvoice, sendInvoiceWhatsapp } from "../utils/getDownloadInvoice";
import { useSnackbar } from "notistack";
interface Bill {
  id: number;
  name: string;
  address: string;
  phone: string;
  date: string;
  time: string;
  services: {
    service: string;
    makeup_type: string;
    price: number;
  }[];
  payment_mode?: string
  total_package: number;
  discount?: number;
  advanced?: number;
  due: number;
  confirmation_date?: string;
  signature?: string;
}
const GoldDivider = () => (
  <div className="my-12 flex justify-center items-center">

    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

    <div className="mx-3 text-yellow-500 text-xl">✦</div>

    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

  </div>
);


const BillView = () => {

  const { id } = useParams();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownload, setDownload] = useState(false);

  const fetchBill = async () => {

    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    }

    setBill(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBill();
  }, [id]);



  const { enqueueSnackbar } = useSnackbar();


  const downloadInvoice = async (bill: Bill) => {
    setDownload(true)
    try {
      await getDownloadInvoice(bill, enqueueSnackbar);
    } catch (error) {
      console.error(error);
    } finally {
      setDownload(false)
    }
  };

  if (loading) {
    return (
      <BillViewLoader />
    );
  }

  if (!bill) {
    return (
      <div className="py-32 text-center text-gray-500">
        Bill not found
      </div>
    );
  }

  //   const sendWhatsAppBill = () => {

  //     const phone = bill.phone?.replace(/\D/g, "");

  //     const message = `
  // Hello ${bill.name},

  // Your booking with Puja's Touch is confirmed.

  // Service: ${bill.service}
  // Date: ${bill.date}
  // Total: ₹${bill.total_package}
  // Advance Paid: ₹${bill.advanced || 0}
  // Due Amount: ₹${bill.due}

  // Thank you for choosing Puja's Touch 💄
  // Location: Khejurhati Bazar, Khandaghosh, Bardhaman
  // Phone: 9064689899
  // `;

  //     const url = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

  //     window.open(url, "_blank");
  //   };

  const invoiceNumber = generateInvoiceNumber(Number(bill?.id ?? 0));





  const paid = bill.due === 0;

  return (
    <div className="py-10 md:py-16  md:px-4 bg-brand-blush/20 min-h-screen">
      <div className="mb-3">
        <BackButton />
      </div>
      {/* ACTION BAR */}
      <div className="max-w-3xl mx-auto mb-6 flex flex-col sm:flex-row justify-end gap-3">

        <button
          onClick={() => downloadInvoice(bill)}
          disabled={isDownload}
          className={`
  flex items-center justify-center gap-2
  w-full sm:w-auto
  px-5 py-2.5
  rounded-full
  bg-gradient-to-r from-brand-rose to-pink-500
  text-white text-sm
  shadow transition-all duration-300
  ${isDownload
              ? "opacity-80 cursor-not-allowed"
              : "hover:shadow-lg hover:scale-[1.02]"
            }
  `}
        >
          {isDownload ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Preparing PDF...
            </>
          ) : (
            <>
              <Download size={16} />
              Download
            </>
          )}
        </button>

        <button
          onClick={() => sendInvoiceWhatsapp(bill)}
          className="
  flex items-center justify-center gap-2
  w-full sm:w-auto
  px-5 py-2.5
  rounded-full
  bg-green-500 text-white text-sm
  hover:bg-green-600 transition
  "
        >
          <MessageCircle size={16} />
          WhatsApp
        </button>

      </div>

      <div
        ref={invoiceRef}
        className="
  relative
  max-w-3xl
  mx-auto
  bg-white
  rounded-3xl
  shadow-[0_40px_100px_rgba(0,0,0,0.18)]
  overflow-hidden
  "
      >

        {/* GOLD FLORAL BACKGROUND */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url('/floral-pattern.png')",
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* GOLD FRAME */}
        <div className="absolute inset-0 border-[3px] border-yellow-400/50 rounded-3xl pointer-events-none"></div>

        {/* CORNERS */}
        <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-yellow-400 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-yellow-400 rounded-tr-3xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-yellow-400 rounded-bl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-yellow-400 rounded-br-3xl"></div>



        {/* HEADER */}
        <div className="relative text-center px-5 md:px-10 pt-10 md:pt-12 pb-8 md:pb-10 bg-gradient-to-r from-brand-rose via-pink-500 to-brand-rose text-white overflow-hidden">

          {/* SOFT GOLD LIGHT EFFECT */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.18),transparent_60%)] pointer-events-none"></div>

          {/* WATERMARK LOGO */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <img src="/logo.png" className="w-96 object-cover" />
          </div>

          {/* GOLD DECORATIVE LINE TOP */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

          {/* LOGO BADGE */}
          <div className="relative flex justify-center mb-6">
            <div className="absolute w-32 h-32 rounded-full bg-yellow-400/20 blur-xl"></div>

            <div className="relative flex justify-center mb-8">

              <div
                className="
    w-28 h-28
    rounded-full
    overflow-hidden
    border-[4px] border-yellow-400
    shadow-[0_12px_35px_rgba(0,0,0,0.35)]
    bg-white
  "
              >
                <img
                  src="/logo.png"
                  alt="Puja's Touch Logo"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

          </div>

          {/* BRAND NAME */}
          <h1
            className="
  text-5xl
  font-[Playfair_Display]
  font-semibold
  tracking-wide
  leading-[1.2]
  pb-2
  inline-block
  bg-[linear-gradient(135deg,#fff7c2,#ffd700,#f7b500,#ffd700,#fff7c2)]
  bg-clip-text
  text-transparent
  drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]
  "
            style={{
              textShadow:
                "0 2px 4px rgba(0,0,0,0.25), 0 0 10px rgba(255,215,0,0.35)"
            }}
          >
            Puja's Touch
          </h1>

          {/* GOLD DIVIDER */}
          <div className="flex justify-center mt-3">
            <div className="w-24 h-[2px] bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 rounded-full"></div>
          </div>

          {/* TAGLINE */}
          <p className="mt-4 text-sm tracking-wide uppercase opacity-90">
            Luxury Bridal Makeup Studio
          </p>

          {/* LOCATION */}
          <p className="text-xs mt-1 opacity-80">
            Khejurhati Bazar • Khandaghosh • Bardhaman
          </p>

          {/* CONTACT */}
          <div className="mt-6 flex justify-center gap-3 md:gap-8 text-sm flex-wrap">

            <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <Phone size={16} />
              9064689899
            </span>

            <a
              href="https://www.facebook.com/share/1891GsRTi7/?mibextid=wwXIfr"
              target="_blank"
              className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition backdrop-blur-sm"
            >
              <Facebook size={16} />
              Facebook
            </a>

          </div>

          {/* GOLD DECORATIVE LINE BOTTOM */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

        </div>

        <div className="relative p-5 md:p-10">

          {/* CLIENT INFO */}
          <div>

            <h2 className="text-lg font-semibold mb-6 text-center md:text-left">
              Client Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Name */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-brand-blush shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blush text-brand-rose">
                  <User size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Client Name</p>
                  <p className="font-semibold text-base">{bill.name}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-brand-blush shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blush text-brand-rose">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{bill.phone}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-brand-blush shadow-sm md:col-span-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blush text-brand-rose">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="font-medium">{bill.address}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-brand-blush shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blush text-brand-rose">
                  <Calendar size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Booking Date</p>
                  <p className="font-medium">{bill.date}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-brand-blush shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blush text-brand-rose">
                  <Clock size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="font-medium">{bill.time}</p>
                </div>
              </div>

            </div>

          </div>

          <GoldDivider />

          {/* SERVICE */}
          <div>

            <h2 className="text-lg font-semibold mb-6 text-center md:text-left">
              Service Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {bill.services?.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-brand-blush shadow-sm hover:shadow-md transition"
                >

                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blush text-brand-rose">
                    <Sparkles size={18} />
                  </div>

                  <div className="flex-1">

                    {/* Service label */}
                    <p className="text-xs text-gray-500">
                      {index === 0 ? "Primary Service" : `Service ${index + 1}`}
                    </p>

                    <p className="font-semibold text-gray-800">
                      {service.service}
                    </p>

                    <p className="text-sm text-gray-500">
                      {service.makeup_type}
                    </p>

                  </div>

                  <div className="text-sm font-semibold text-brand-rose">
                    {formatCurrency(service.price)}
                  </div>

                </div>
              ))}

              {/* Payment Mode */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-brand-blush shadow-sm hover:shadow-md transition md:col-span-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blush text-brand-rose">
                  <CreditCard size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Payment Mode</p>
                  <p className="font-medium">{bill.payment_mode}</p>
                </div>
              </div>

            </div>

          </div>

          <GoldDivider />

          {/* PAYMENT */}
          <div className="rounded-2xl border border-brand-blush bg-brand-blush/20 p-5 md:p-6 shadow-sm">

            <h2 className="text-lg font-semibold mb-5 text-center md:text-left">
              Payment Summary
            </h2>

            <div className="space-y-3">

              {/* Total Package */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-brand-blush shadow-sm">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Wallet size={18} className="text-brand-rose" />
                  Total Package
                </div>

                <span className="font-semibold text-gray-800">
                  {formatCurrency(bill.total_package)}
                </span>
              </div>

              {/* Discount */}
              {bill.discount != null && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-green-200 shadow-sm">
                  <div className="flex items-center gap-3 text-sm text-green-600">
                    <Tag size={18} />
                    Discount
                  </div>

                  <span className="font-semibold text-green-600">
                    - {formatCurrency(bill.discount)}
                  </span>
                </div>
              )}

              {/* Advance Paid */}
              {bill.advanced != null && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-brand-blush shadow-sm">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Banknote size={18} className="text-brand-rose" />
                    Advanced Paid
                  </div>

                  <span className="font-medium">
                    {formatCurrency(bill.advanced)}
                  </span>
                </div>
              )}

            </div>

            {/* Total Due */}
            <div className="mt-5 pt-4 border-t border-dashed flex items-center justify-between">

              <div className="flex items-center gap-2 text-base font-semibold">
                <IndianRupee size={18} className="text-brand-rose" />
                Due Amount
              </div>

              <span
                className={`text-xl font-bold ${paid ? "text-green-600" : "text-brand-rose"
                  }`}
              >
                {formatCurrency(bill.due)}
              </span>

            </div>

          </div>

          <GoldDivider />

          {/* STATUS */}
          <div className="flex justify-between items-center mb-12">

            <span
              className={`px-4 py-1 rounded-full text-sm
              ${paid
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {paid ? "Payment Completed" : "Pending Payment"}
            </span>

            <span className="text-xs text-gray-400">
              Invoice {invoiceNumber}
            </span>

          </div>

          <GoldDivider />

          {/* TERMS & CONDITIONS */}
          <div className="rounded-2xl border border-yellow-400/40 bg-yellow-50/40 p-6">

            <h2 className="text-lg font-semibold text-center mb-4">
              Terms & Conditions
            </h2>

            <div className="space-y-2 text-sm text-gray-700">

              <p>• Advance payment confirms the booking.</p>

              <p>• Advance amount is non-refundable once the booking is confirmed.</p>

              <p>• Client must arrive on time for the scheduled makeup session.</p>

              <p>• Additional services requested on the event day may incur extra charges.</p>

              <p>• Remaining due payment must be completed before or after service.</p>

              <p>• Puja's Touch is not responsible for delays caused by external factors.</p>

            </div>

          </div>
          {/* SIGNATURE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mt-10">

            <div className="text-center">

              <p className="text-xs text-gray-500 mb-2">
                Authorized Signature
              </p>

              <div
                className="text-4xl text-gray-700 mb-2"
                style={{ fontFamily: "Great Vibes, cursive" }}
              >
                {bill.signature}
              </div>

              <div className="h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

            </div>

            <div className="text-center">

              <p className="text-xs text-gray-500 mb-2">
                Confirmation Date
              </p>

              <div className="text-sm font-medium text-gray-700">
                {bill.confirmation_date}
              </div>

              <div className="h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-2"></div>

            </div>

          </div>
          <GoldDivider />

          <div className="text-center text-xs text-gray-500 space-y-1">

            <p className="font-medium text-gray-700">
              Thank you for choosing Puja's Touch
            </p>

            <p>
              Luxury Bridal Makeup Studio • Khejurhati • Bardhaman
            </p>

            <p>
              For bookings & inquiries contact: 9064689899
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};

export default BillView;
