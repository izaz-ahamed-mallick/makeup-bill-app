import { CalendarDays, Clock, Phone, Eye, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Bill } from "./Types";
import { supabase } from "../lib/supabase";
import BackButton from "./Ui/BackButton";

const UpcomingBookings = () => {


  const [bookings, setBookings] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchBookings = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .gte("date", new Date().toISOString().split("T")[0]) // upcoming
      .order("date", { ascending: true });

    if (!error) {
      setBookings(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    const loadeBooking = async () => {
      await fetchBookings();
    }
    loadeBooking()
  }, []);


  const [loadingId, setLoadingId] = useState<number | null>(null);
  const handleCall = (booking: Bill) => {
    setLoadingId(booking.id);

    setTimeout(() => {
      window.open(`tel:${booking.phone}`);
      setLoadingId(null);
    }, 800);
  };

  const handleWhatsApp = async (booking: Bill) => {
    setLoadingId(booking.id);

    await new Promise((res) => setTimeout(res, 800));

    const message = encodeURIComponent(
      `Hello ${booking.name},

This is a friendly reminder from *Puja's Touch – Luxury Bridal Makeup Artist*.

Your makeup booking is scheduled for:

Date: ${booking.date}
 Time: ${booking.time}

I will arrive at your location at the scheduled time. Kindly ensure you are ready so we can begin smoothly.

Thank you for choosing *Puja's Touch*.
Looking forward to making your day even more beautiful

— Puja's Touch`
    );

    window.open(`https://wa.me/91${booking.phone}?text=${message}`, "_blank");

    setLoadingId(null);
  };

  const getBookingStatus = (date: any) => {
    const today = new Date();
    const bookingDate = new Date(date);

    const todayDate = today.toDateString();
    const bookingDateStr = bookingDate.toDateString();

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDate = tomorrow.toDateString();

    if (bookingDateStr === todayDate) return "today";
    if (bookingDateStr === tomorrowDate) return "tomorrow";

    return "upcoming";
  };

  const getStatusLabel = (status: string) => {
    if (status === "today") return "Today";
    if (status === "tomorrow") return "Tomorrow";
    return "Upcoming";
  };

  if (loading) {
    return (
      <div className="py-10 px-4 bg-brand-blush/20 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-brand-blush shadow-sm animate-pulse"
            >
              <div className="flex justify-between mb-4">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>

                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </div>

              <div className="flex gap-6 mb-4">
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
              </div>

              <div className="flex gap-3">
                <div className="h-9 flex-1 bg-gray-200 rounded-full"></div>
                <div className="h-9 flex-1 bg-gray-200 rounded-full"></div>
                <div className="h-9 flex-1 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="py-32 text-center text-gray-500">
        No upcoming bookings
      </div>
    );
  }

  return (
    <div className="py-10 px-4 bg-brand-blush/20 min-h-screen">
      <div className="mb-3">
        <BackButton />
      </div>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-3xl font-semibold text-brand-rose font-[Playfair_Display]">
            Upcoming Bookings
          </h1>

          <div className="w-20 h-[2px] bg-brand-gold mt-3"></div>

          <p className="text-sm text-gray-500 mt-2">
            Manage your upcoming bridal makeup schedule
          </p>

        </div>

        {/* Booking List */}
        <div className="space-y-5">

          {bookings.map((booking: Bill) => {

            const status = getBookingStatus(booking.date);

            return (
              <div
                key={booking.id}
                className={`
  relative
  bg-white/90
  backdrop-blur-sm
  border
  rounded-3xl
  p-6
  shadow-md
  hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
  transition-all duration-300
  ${status === "today"
                    ? "border-yellow-300 bg-yellow-50/40"
                    : "border-brand-blush"}
`}
              >

                {/* subtle luxury glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_70%)] pointer-events-none"></div>

                {/* HEADER */}
                <div className="flex justify-between items-start mb-5">

                  <div>
                    <h3 className="text-lg font-semibold text-brand-text">
                      {booking.name}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Client Booking
                    </p>
                  </div>

                  <span
                    className={`
      px-3 py-1 text-xs rounded-full font-medium shadow-sm
      ${status === "today"
                        ? "bg-yellow-100 text-yellow-700"
                        : status === "tomorrow"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-brand-blush text-brand-rose"}
    `}
                  >
                    {getStatusLabel(status)}
                  </span>

                </div>


                {/* SERVICES */}
                <div className="space-y-3 mb-5">

                  {booking.services?.map((s, i) => (

                    <div
                      key={i}
                      className="
        flex items-center justify-between
        p-3 rounded-xl
        border border-brand-blush
        bg-white
        shadow-sm
      "
                    >

                      <div className="flex items-start gap-3">

                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-blush text-brand-rose">
                          ✦
                        </div>

                        <div>

                          <p className="text-sm font-semibold text-gray-800">
                            {i === 0 ? "Primary Service" : `Service ${i + 1}`}
                          </p>

                          <p className="text-sm text-gray-600">
                            {s.service} — {s.makeup_type}
                          </p>

                          {/* SERVICE DATE */}
                          {s.serviceDate && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                              <CalendarDays size={13} className="text-brand-rose" />
                              {s.serviceDate}
                            </div>
                          )}

                        </div>

                      </div>

                      <div className="text-sm font-semibold text-brand-rose">
                        ₹{s.price}
                      </div>

                    </div>

                  ))}

                </div>


                {/* DATE + TIME */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-brand-rose" />
                    {booking.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-brand-rose" />
                    {booking.time}
                  </div>

                </div>


                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-3">

                  {/* VIEW */}
                  <Link
                    to={`/view-bill/${booking.id}`}
                    className="
                    flex-1
                    flex items-center justify-center gap-2
                    rounded-full
                    border border-brand-gold
                    text-brand-gold
                    py-2.5
                    text-sm font-medium
                    hover:bg-brand-gold hover:text-white
                    shadow-sm hover:shadow-md
                    transition
                  "
                  >
                    <Eye size={16} />
                    View
                  </Link>


                  {/* CALL */}
                  <button
                    onClick={() => handleCall(booking)}
                    className="
      flex-1
      flex items-center justify-center gap-2
      rounded-full
      bg-gradient-to-r from-brand-rose to-pink-500
      text-white
      py-2.5
      text-sm font-medium
      shadow-sm hover:shadow-lg
      transition
    "
                  >
                    {loadingId === booking.id ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Phone size={16} />
                        Call
                      </>
                    )}
                  </button>


                  {/* WHATSAPP */}
                  <button
                    onClick={() => handleWhatsApp(booking)}
                    className="
                        flex-1
                        flex items-center justify-center gap-2
                        rounded-full
                        bg-green-500
                        text-white
                        py-2.5
                        text-sm font-medium
                        shadow-sm hover:shadow-lg
                        hover:bg-green-600
                        transition
                      "
                  >
                    {loadingId === booking.id ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <MessageCircle size={16} />
                        Reminder
                      </>
                    )}
                  </button>

                </div>

              </div>

            );
          })}

        </div>

      </div>

    </div>
  );
};

export default UpcomingBookings;
