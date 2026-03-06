
const UpcomingLoader = () => {
  return (
    <div className="py-10 px-4 bg-brand-blush/20 min-h-screen">

      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header shimmer */}
        <div className="space-y-3 animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded-md"></div>
          <div className="h-[2px] w-20 bg-gray-200"></div>
          <div className="h-3 w-48 bg-gray-200 rounded"></div>
        </div>

        {/* Booking shimmer cards */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
            relative
            bg-white
            rounded-3xl
            p-6
            border border-brand-blush
            shadow-sm
            overflow-hidden
            animate-pulse
          "
          >

            {/* shimmer gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_2s_infinite]" />

            {/* top row */}
            <div className="flex justify-between mb-6">
              <div className="space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </div>

              <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            </div>

            {/* services */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200"></div>

                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>

                <div className="h-4 w-12 bg-gray-200 rounded"></div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200"></div>

                <div className="flex-1 space-y-2">
                  <div className="h-3 w-28 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>

                <div className="h-4 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* buttons */}
            <div className="flex gap-3">
              <div className="h-10 flex-1 bg-gray-200 rounded-full"></div>
              <div className="h-10 flex-1 bg-gray-200 rounded-full"></div>
              <div className="h-10 flex-1 bg-gray-200 rounded-full"></div>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default UpcomingLoader
