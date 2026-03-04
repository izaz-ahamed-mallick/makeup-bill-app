import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { formatCurrency } from "./formatCurrency";
import { Link, useLocation } from "react-router-dom";
import LatestBookingsLoader from "./Ui/LatestBookingsLoader";
import DeleteConfirmModal from "./Ui/DeleteConfirmModal";
import { useSnackbar } from "notistack";
import BackButton from "./Ui/BackButton";

interface Booking {
  id: number;
  name: string;
  date: string;
  service: string;
  makeup_type: string;
  total_package: number;
  discount: number;
  advanced: number;
  due: number;
}

const LatestBookings = () => {
  const location = useLocation();
  const highlightId = location.state?.highlightId;
  const { enqueueSnackbar } = useSnackbar();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bills")
      .select(
        "id, name, date, service, makeup_type, total_package, discount, advanced, due"
      )
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error && data) setBookings(data);

    setLoading(false);
  };
  const handleDelete = async () => {

    if (!deleteId) return;

    setDeletingId(deleteId);

    const { error } = await supabase
      .from("bills")
      .delete()
      .eq("id", deleteId);

    if (error) {
      console.error(error);
      enqueueSnackbar("Failed to delete booking ❌", { variant: "error" });
      setDeletingId(null);
      return;
    }

    setBookings((prev) => prev.filter((b) => b.id !== deleteId));

    enqueueSnackbar("Booking deleted successfully 🗑️", { variant: "success" });

    setDeletingId(null);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (!highlightId) return;

    const el = cardRefs.current[highlightId];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [bookings, highlightId]);

  if (loading) return <LatestBookingsLoader />;

  /* -------------------- Dashboard Stats -------------------- */

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + b.total_package,
    0
  );

  const totalPending = bookings.reduce(
    (sum, b) => sum + b.due,
    0
  );

  const paidCount = bookings.filter((b) => b.due === 0).length;

  /* -------------------- Search -------------------- */

  const filteredBookings = bookings.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  /* -------------------- Empty State -------------------- */

  if (!loading && bookings.length === 0) {
    return (
      <div className="py-24 text-center text-brand-text">
        <p className="text-xl font-semibold">No bookings yet</p>
        <p className="text-sm opacity-70 mt-2">
          Create your first bridal booking.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-brand-rose font-[Playfair Display]">
            Latest Bookings
          </h2>
          <div className="w-20 h-[2px] bg-brand-gold mt-3"></div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

          <div className="bg-white rounded-2xl p-4 shadow border border-brand-blush">
            <p className="text-xs text-gray-500">Total Bookings</p>
            <p className="text-xl font-semibold">{bookings.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow border border-brand-blush">
            <p className="text-xs text-gray-500">Revenue</p>
            <p className="text-xl font-semibold text-green-600">
              {formatCurrency(totalRevenue)}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow border border-brand-blush">
            <p className="text-xs text-gray-500">Pending Amount</p>
            <p className="text-xl font-semibold text-brand-rose">
              {formatCurrency(totalPending)}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow border border-brand-blush">
            <p className="text-xs text-gray-500">Paid Bookings</p>
            <p className="text-xl font-semibold text-green-600">
              {paidCount}
            </p>
          </div>

        </div>

        {/* Search */}
        <div className="mb-10 flex justify-between items-center">

          <div className="relative w-full md:w-96">

            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>

            <input
              placeholder="Search client name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
      w-full
      pl-11 pr-10
      py-3
      rounded-full
      border border-brand-blush
      bg-white/70 backdrop-blur-sm
      shadow-sm
      text-sm
      focus:outline-none
      focus:ring-2 focus:ring-brand-rose
      focus:border-brand-rose
      transition-all duration-300
      "
            />

            {/* Clear Button */}
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}

          </div>

        </div>
        {filteredBookings.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-24 text-center">

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-blush/40 mb-6">
              🔍
            </div>

            <h3 className="text-lg font-semibold text-brand-text">
              No bookings found
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              No client matches <span className="font-medium">"{search}"</span>
            </p>

            <button
              onClick={() => setSearch("")}
              className="mt-6 px-6 py-2 rounded-full bg-brand-rose text-white text-sm shadow hover:shadow-lg transition"
            >
              Clear Search
            </button>

          </div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredBookings.map((booking) => {

              const isPaid = booking.due === 0;

              return (
                <div
                  key={booking.id}
                  ref={(el) => (cardRefs.current[booking.id] = el)}
                  className={`rounded-3xl p-6 border backdrop-blur-sm transition-all duration-500
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:-translate-y-1
                ${highlightId === booking.id
                      ? "bg-yellow-50 border-yellow-300 shadow-xl scale-[1.03]"
                      : "bg-white/90 border-brand-blush shadow-md"
                    }`}
                >

                  {/* Client */}
                  <div className="flex justify-between items-start mb-5">

                    <div>
                      <h3 className="text-lg font-semibold text-brand-text">
                        {booking.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {booking.date}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs rounded-full
                    ${isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {isPaid ? "Paid" : "Pending"}
                    </span>

                  </div>

                  {/* Service */}
                  <div className="space-y-2 text-sm text-brand-text mb-6">

                    <p>
                      <span className="font-medium">Service:</span>{" "}
                      {booking.service}
                    </p>

                    <p>
                      <span className="font-medium">Makeup Type:</span>{" "}
                      {booking.makeup_type}
                    </p>

                  </div>

                  {/* Payment */}
                  <div className="grid grid-cols-2 gap-3 mb-6">

                    <div className="bg-brand-blush/40 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="font-semibold">
                        {formatCurrency(booking.total_package)}
                      </p>
                    </div>

                    <div className="bg-brand-blush/40 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500">Discount</p>
                      <p className="font-semibold text-green-600">
                        - {formatCurrency(booking.discount)}
                      </p>
                    </div>

                    <div className="bg-brand-blush/40 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500">Advanced</p>
                      <p className="font-semibold">
                        {formatCurrency(booking.advanced)}
                      </p>
                    </div>

                    <div className="bg-brand-blush/40 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500">Due</p>
                      <p className="font-semibold text-brand-rose">
                        {formatCurrency(booking.due)}
                      </p>
                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-4">

                    {/* VIEW */}
                    <Link
                      to={`/view-bill/${booking.id}`}
                      className="
    flex-1 flex items-center justify-center
    min-h-[42px]
    border border-blue-300
    text-blue-600
    rounded-full
    text-sm font-medium
    tracking-wide
    hover:bg-blue-600 hover:text-white
    transition-all duration-300
    shadow-sm hover:shadow-md
    "
                    >
                      👁 View
                    </Link>

                    {/* EDIT */}
                    <Link
                      to={`/edit-bill/${booking.id}`}
                      className="
    flex-1 flex items-center justify-center
    min-h-[42px]
    border border-brand-gold
    text-brand-gold
    rounded-full
    text-sm font-medium
    tracking-wide
    hover:bg-brand-gold hover:text-white
    transition-all duration-300
    shadow-sm hover:shadow-md
    "
                    >
                      Edit
                    </Link>


                    {/* DELETE */}
                    <button
                      onClick={() => {
                        setDeleteId(booking.id);
                        setShowDeleteModal(true);
                      }}
                      disabled={deletingId === booking.id}
                      className={`
    px-3 flex items-center justify-center
    min-h-[42px]
    rounded-full border border-red-300
    transition-all duration-300
    ${deletingId === booking.id
                          ? "bg-red-100 text-red-400 cursor-not-allowed"
                          : "text-red-500 hover:bg-red-500 hover:text-white"
                        }
    `}
                    >

                      {deletingId === booking.id ? (

                        <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></span>

                      ) : (

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 7h12M9 7v10m6-10v10M10 3h4m-7 4h14l-1 13H5L4 7z"
                          />
                        </svg>

                      )}

                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}
      </div>
      <DeleteConfirmModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>

  );
};

export default LatestBookings;
