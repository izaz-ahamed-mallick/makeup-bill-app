export const BookingShimmer = () => {
  return (
    <div className="space-y-5 animate-pulse">

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white border border-brand-blush rounded-2xl p-5 shadow-sm"
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
          </div>
        </div>
      ))}

    </div>
  );
};
