const LatestBookingsLoader = () => {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header Loader */}
        <div className="mb-12">
          <div className="h-10 w-64 shimmer2 rounded-lg mb-3"></div>
          <div className="h-[2px] w-20 shimmer2 rounded"></div>
        </div>

        {/* Cards Loader */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-brand-blush shadow-md space-y-5"
            >

              {/* Name + Date */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-4 w-32 shimmer2 rounded"></div>
                  <div className="h-3 w-20 shimmer2 rounded"></div>
                </div>

                <div className="h-6 w-16 shimmer2 rounded-full"></div>
              </div>

              {/* Service */}
              <div className="space-y-2">
                <div className="h-3 w-40 shimmer2 rounded"></div>
                <div className="h-3 w-36 shimmer2 rounded"></div>
              </div>

              {/* Payment Boxes */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 shimmer2 rounded-xl"></div>
                <div className="h-16 shimmer2 rounded-xl"></div>
                <div className="h-16 shimmer2 rounded-xl"></div>
                <div className="h-16 shimmer2 rounded-xl"></div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <div className="flex-1 h-10 shimmer2 rounded-full"></div>
                <div className="flex-1 h-10 shimmer2 rounded-full"></div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default LatestBookingsLoader;
