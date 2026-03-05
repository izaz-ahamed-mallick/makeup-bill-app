import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import PreviousBillsLoader from "./Loader/PreviousBillsLoader";
import BackButton from "./Ui/BackButton";
import { Link } from "react-router-dom";
import { Download, Eye } from "lucide-react";
import type { Bill } from "./Types";
import { getDownloadInvoice } from "./utils/getDownloadInvoice";
import { useSnackbar } from "notistack";
const PAGE_SIZE = 8;

const PreviousBills = () => {
  const [isDownload, setDownload] = useState<number | null>(null)

  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const fetchBills = async () => {

    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("bills")
      .select(
        "*",
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) query = query.ilike("name", `%${search}%`);
    if (filter === "paid") query = query.eq("due", 0);
    if (filter === "pending") query = query.gt("due", 0);

    const { data, count } = await query;

    setBills(data || []);
    setTotalCount(count || 0);

    setLoading(false);

  };

  useEffect(() => {
    const loadBills = async () => {
      await fetchBills();
    };

    loadBills();
  }, [page, search, filter]);




  const { enqueueSnackbar } = useSnackbar();

  const downloadInvoice = async (bill: Bill) => {
    setDownload(bill.id)
    try {
      await getDownloadInvoice(bill, enqueueSnackbar);
    } catch (error) {
      console.error(error);
    } finally {
      setDownload(null)
    }
  };


  return (
    <div className="py-10 sm:py-16">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}

        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-brand-rose font-[Playfair Display]">
            Previous Bills
          </h2>
          <div className="w-20 h-[2px] bg-brand-gold mt-3"></div>
          <p className="text-sm text-gray-500 mt-2">
            Manage all client billing history
          </p>
        </div>

        {/* Search + Filters */}
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">

          {/* Premium Search */}
          <div className="relative w-full md:w-96">

            {/* Search Icon */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
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
                  d="M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </span>

            <input
              placeholder="Search client..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="
      w-full
      pl-10 pr-10
      py-3
      rounded-full
      border border-brand-blush
      bg-white/70 backdrop-blur-sm
      shadow-sm
      text-sm
      focus:outline-none
      focus:ring-2 focus:ring-brand-rose
      transition
      "
            />

            {/* Clear Icon */}
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        w-6 h-6
        flex items-center justify-center
        rounded-full
        text-gray-400
        hover:text-gray-700
        hover:bg-gray-100
        transition
        "
              >
                ✕
              </button>
            )}

          </div>

          {/* Filters */}
          <div className="flex gap-2">

            {["all", "paid", "pending"].map((type) => (

              <button
                key={type}
                onClick={() => {
                  setPage(1);
                  setFilter(type);
                }}
                className={`
        px-4 py-2 rounded-full text-sm transition
        ${filter === type
                    ? "bg-brand-rose text-white shadow"
                    : "border border-brand-blush hover:bg-brand-blush/40"
                  }
        `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>

            ))}

          </div>

        </div>

        {loading && <PreviousBillsLoader />}

        {!loading && bills.length === 0 ? (

          <div className="py-28 flex flex-col items-center justify-center text-center">

            <div className="w-20 h-20 rounded-full bg-brand-blush/40 flex items-center justify-center mb-6 text-3xl">
              🧾
            </div>

            <h3 className="text-xl font-semibold text-brand-text">
              No bills yet
            </h3>

            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              You haven't created any billing records yet.
              Start by creating your first client bill.
            </p>

            <Link
              to="/create-bill"
              className="mt-6 px-6 py-2 rounded-full bg-brand-rose text-white text-sm shadow hover:shadow-lg transition"
            >
              + Create Bill
            </Link>

          </div>

        ) : !loading && bills.length === 0 ? (

          <div className="py-24 flex flex-col items-center justify-center text-center">

            <div className="w-16 h-16 rounded-full bg-brand-blush/40 flex items-center justify-center mb-6 text-xl">
              🔍
            </div>

            <h3 className="text-lg font-semibold text-brand-text">
              No bills found
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              No billing records match your search or selected filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setFilter("all");
                setPage(1);
              }}
              className="mt-6 px-6 py-2 rounded-full bg-brand-rose text-white text-sm shadow hover:shadow-lg transition"
            >
              Reset Filters
            </button>

          </div>

        ) :

          (<>
            {/* MOBILE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">

              {bills.map((bill) => {

                const paid = bill.due === 0;

                return (

                  <div
                    key={bill.id}
                    className="bg-white rounded-3xl border border-brand-blush shadow hover:shadow-lg transition p-5"
                  >

                    <div className="flex justify-between items-start mb-3">

                      <h3 className="font-semibold text-brand-text">
                        {bill.name}
                      </h3>

                      <span
                        className={`text-xs px-3 py-1 rounded-full
                    ${paid
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {paid ? "Paid" : "Pending"}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500">{bill.date}</p>

                    <p className="text-sm mt-2">
                      <span className="font-medium">Service:</span> {bill.service}
                    </p>

                    <p className="text-sm">
                      <span className="font-medium">Total:</span> ₹{bill.total_package}
                    </p>

                    <p className="text-sm text-brand-rose">
                      <span className="font-medium">Due:</span> ₹{bill.due}
                    </p>

                    {/* Mobile Actions */}
                    {/* Mobile Actions */}
                    <div className="flex gap-3 mt-4">

                      <Link
                        to={`/view-bill/${bill.id}`}
                        className="
    w-11 h-11
    flex items-center justify-center
    rounded-full
    border border-brand-gold
    text-brand-gold
    bg-white
    hover:bg-brand-gold
    hover:text-white
    hover:shadow-lg
    transition-all duration-300
    "
                      >
                        <Eye size={18} />
                      </Link>

                      <button
                        onClick={() => downloadInvoice(bill)}
                        disabled={isDownload === bill.id}
                        className={`
                              flex-1
                              h-11
                              flex items-center justify-center gap-2
                              rounded-full
                              bg-gradient-to-r from-brand-rose to-pink-500
                              text-white
                              font-medium
                              transition-all duration-300
                              ${isDownload === bill.id
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:shadow-lg hover:scale-[1.02]"
                          }
  `}
                      >
                        {isDownload === bill.id ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Preparing...
                          </>
                        ) : (
                          <>
                            <Download size={18} />
                            Download
                          </>
                        )}
                      </button>

                    </div>

                  </div>

                );

              })}

            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white rounded-3xl border border-brand-blush shadow overflow-hidden">

              <table className="w-full text-sm">

                <thead className="bg-brand-blush/40">

                  <tr>

                    <th className="px-6 py-4 text-left">Client</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Service</th>
                    <th className="px-6 py-4 text-left">Total</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {bills.map((bill) => {

                    const paid = bill.due === 0;

                    return (

                      <tr
                        key={bill.id}
                        className="border-t hover:bg-brand-blush/30 hover:shadow-sm transition"
                      >

                        <td className="px-6 py-4 font-medium">
                          {bill.name}
                        </td>

                        <td className="px-6 py-4 text-gray-500">
                          {bill.date}
                        </td>

                        <td className="px-6 py-4">
                          {bill.service}
                        </td>

                        <td className="px-6 py-4 font-medium">
                          ₹{bill.total_package}
                        </td>

                        <td className="px-6 py-4">

                          <span
                            className={`px-3 py-1 rounded-full text-xs
                        ${paid
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                              }`}
                          >
                            {paid ? "Paid" : "Pending"}
                          </span>

                        </td>

                        {/* Premium Actions */}
                        <td className="px-6 py-4">

                          <div className="flex justify-end gap-2">

                            <Link
                              to={`/view-bill/${bill.id}`}
                              className="
  w-10 h-10
  flex items-center justify-center
  rounded-full
  border border-brand-gold
  text-brand-gold
  bg-white
  hover:bg-brand-gold
  hover:text-white
  hover:shadow-lg
  hover:scale-105
  transition-all duration-300
  "
                            >
                              <Eye size={18} />
                            </Link>

                            <button
                              onClick={() => downloadInvoice(bill)}
                              disabled={isDownload === bill.id}
                              className={`
                                  w-10 h-10
                                  flex items-center justify-center
                                  rounded-full
                                  bg-gradient-to-r from-brand-rose to-pink-500
                                  text-white
                                  transition-all duration-300
                                  ${isDownload === bill.id
                                  ? "opacity-70 cursor-not-allowed"
                                  : "hover:shadow-lg hover:scale-105"
                                }
  `}
                            >
                              {isDownload === bill.id ? (
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              ) : (
                                <Download size={18} />
                              )}
                            </button>

                          </div>

                        </td>

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

            {/* Premium Pagination */}
            {bills.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 rounded-full border border-brand-blush hover:bg-brand-blush/40 disabled:opacity-40"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNumber = i + 1;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`
          w-9 h-9 rounded-full text-sm transition
          ${page === pageNumber
                          ? "bg-brand-rose text-white shadow"
                          : "border border-brand-blush hover:bg-brand-blush/40"
                        }
          `}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 rounded-full border border-brand-blush hover:bg-brand-blush/40 disabled:opacity-40"
                >
                  Next
                </button>

              </div>
            )}
          </>
          )}
      </div>

    </div >
  );
};

export default PreviousBills;
