const PreviousBillsLoader = () => {
  return (
    <div className="animate-pulse">

      {/* Mobile Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl border border-brand-blush shadow p-5 space-y-3"
          >
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-28 bg-gray-200 rounded"></div>

            <div className="flex gap-2 mt-4">
              <div className="h-9 flex-1 bg-gray-200 rounded-full"></div>
              <div className="h-9 flex-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}

      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block bg-white rounded-3xl border border-brand-blush shadow overflow-hidden">

        <table className="w-full">

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

            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="border-t">

                <td className="px-6 py-4">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </td>

                <td className="px-6 py-4">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </td>

                <td className="px-6 py-4">
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </td>

                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </td>

                <td className="px-6 py-4">
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                    <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PreviousBillsLoader;
