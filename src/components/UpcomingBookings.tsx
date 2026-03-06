import {
  CalendarDays,
  Clock,
  Phone,
  Eye,
  MessageCircle,
  MapPin,
  Sparkles,
  Navigation
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Bill } from "./Types";
import { supabase } from "../lib/supabase";
import BackButton from "./Ui/BackButton";
import { formatCurrency } from "./formatCurrency";
import UpcomingLoader from "./Loader/UpcomingLoader";

const UpcomingBookings = () => {

  const [bookings, setBookings] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const fetchBookings = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("bills")
      .select("*")
      .gte("date", new Date().toISOString().split("T")[0])
      .order("date", { ascending: true });

    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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

I will arrive at your location at the scheduled time.

Thank you for choosing *Puja's Touch*.

— Puja's Touch`
    );

    window.open(`https://wa.me/91${booking.phone}?text=${message}`, "_blank");
    setLoadingId(null);
  };

  const openDirections = (location: string) => {
    const encoded = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`);
  };

  const getBookingStatus = (date: any) => {
    const today = new Date();
    const bookingDate = new Date(date);

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (bookingDate.toDateString() === today.toDateString()) return "today";
    if (bookingDate.toDateString() === tomorrow.toDateString()) return "tomorrow";

    return "upcoming";
  };

  const todayBookings = bookings.filter(
    (b) => getBookingStatus(b.date) === "today"
  );

  const tomorrowBookings = bookings.filter(
    (b) => getBookingStatus(b.date) === "tomorrow"
  );

  const upcomingBookings = bookings.filter(
    (b) => getBookingStatus(b.date) === "upcoming"
  );

  /* BOOKING CARD */

  const BookingCard = (booking: Bill) => {

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
        hover:-translate-y-[2px]
        transition-all duration-300
        ${status === "today"
            ? "border-yellow-300 bg-yellow-50/40"
            : "border-brand-blush"}
      `}
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_70%)] pointer-events-none"></div>

        {/* HEADER */}

        <div className="flex justify-between mb-5">

          <div>
            <h3 className="text-lg font-semibold text-brand-text">
              {booking.name}
            </h3>

            <p className="text-xs text-gray-400">
              Client Booking
            </p>
          </div>

        </div>

        {/* SERVICES */}

        <div className="space-y-3 mb-6">

          {booking.services?.map((s, i) => (

            <div
              key={i}
              className="
              p-4
              rounded-2xl
              border border-brand-blush
              bg-white
              shadow-sm
              hover:shadow-lg
              hover:border-brand-gold
              transition
            "
            >

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

                <div className="flex gap-3">

                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-blush text-brand-rose">
                    <Sparkles size={16} />
                  </div>

                  <div>

                    <p className="text-sm font-semibold">
                      {i === 0 ? "Primary Service" : `Service ${i + 1}`}
                    </p>

                    <p className="text-sm text-gray-600">
                      {s.service} — {s.makeup_type}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">

                      {s.serviceDate && (
                        <div className="flex items-center gap-1">
                          <CalendarDays size={13} />
                          {s.serviceDate}
                        </div>
                      )}

                      {s.serviceTime && (
                        <div className="flex items-center gap-1">
                          <Clock size={13} />
                          {s.serviceTime}
                        </div>
                      )}

                    </div>

                    {s.location && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap">

                        <div className="flex items-center gap-1 text-xs">
                          <MapPin size={13} />
                          {s.location}
                        </div>

                        <button
                          onClick={() => openDirections(s.location)}
                          className="
                          flex items-center gap-1
                          text-xs
                          px-2 py-1
                          rounded-full
                          bg-brand-rose/10
                          text-brand-rose
                          hover:bg-brand-rose hover:text-white
                        "
                        >
                          <Navigation size={12} />
                          Directions
                        </button>

                      </div>
                    )}

                  </div>

                </div>

                <div className="text-sm font-semibold text-brand-rose">
                  {formatCurrency(Number(s.price))}
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* ACTIONS */}

        <div className="flex flex-col sm:flex-row gap-3">

          <Link
            to={`/view-bill/${booking.id}`}
            className="
            flex-1 flex items-center justify-center gap-2
            rounded-full border border-brand-gold
            text-brand-gold py-2.5 text-sm
            hover:bg-brand-gold hover:text-white
          "
          >
            <Eye size={16} />
            View
          </Link>

          <button
            onClick={() => handleCall(booking)}
            className="
            flex-1 flex items-center justify-center gap-2
            rounded-full bg-gradient-to-r from-brand-rose to-pink-500
            text-white py-2.5 text-sm
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

          <button
            onClick={() => handleWhatsApp(booking)}
            className="
            flex-1 flex items-center justify-center gap-2
            rounded-full bg-green-500 text-white py-2.5 text-sm
          "
          >
            <MessageCircle size={16} />
            Reminder
          </button>

        </div>

      </div>
    );
  };

  /* SECTION */



  if (loading) {
    return <UpcomingLoader />;
  }

  return (

    <div className="py-10 px-4 bg-brand-blush/20 min-h-screen">

      <div className="mb-3">
        <BackButton />
      </div>

      <div className="max-w-4xl mx-auto">

        <div className="mb-10">

          <h1 className="text-3xl font-semibold text-brand-rose font-[Playfair_Display]">
            Upcoming Bookings
          </h1>

          <div className="w-20 h-[2px] bg-brand-gold mt-3"></div>

          <p className="text-sm text-gray-500 mt-2">
            Manage your upcoming bridal makeup schedule
          </p>

        </div>

        <Section
          title="Today"
          data={todayBookings}
          renderCard={BookingCard}
        />

        <Section
          title="Tomorrow"
          data={tomorrowBookings}
          renderCard={BookingCard}
        />

        <Section
          title="Upcoming"
          data={upcomingBookings}
          renderCard={BookingCard}
        />

      </div>

    </div>

  );
};


interface SectionProps {
  title: string;
  data: Bill[];
  renderCard: (booking: Bill) => React.ReactNode;
}

const Section = ({ title, data, renderCard }: SectionProps) => {

  if (!data.length) return null;

  return (
    <div className="mb-12">

      <div className="sticky top-0 bg-brand-blush/20 backdrop-blur-md py-3 z-10">

        <div className="flex items-center gap-3">

          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <div className="flex-1 h-[1px] bg-brand-blush"></div>

          <span className="text-xs text-gray-400">
            {data.length}
          </span>

        </div>

      </div>

      <div className="space-y-5 mt-5">
        {data.map((b) => renderCard(b))}
      </div>

    </div>
  );
};



export default UpcomingBookings;
