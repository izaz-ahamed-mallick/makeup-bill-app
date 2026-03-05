

const BillViewLoader = () => {
  return (
    <div className="py-16 px-4 bg-brand-blush/20 min-h-screen animate-pulse">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header shimmer */}
        <div className="bg-gradient-to-r from-brand-rose via-pink-500 to-brand-rose p-10 text-center">
          <div className="w-20 h-20 bg-white/40 rounded-full mx-auto mb-4"></div>
          <div className="h-6 w-48 bg-white/40 mx-auto rounded"></div>
          <div className="h-4 w-32 bg-white/30 mx-auto mt-3 rounded"></div>
        </div>

        <div className="p-6 space-y-8">

          {/* Client Info */}
          <div>
            <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-100"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service section */}
          <div>
            <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-100"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    <div className="h-4 w-28 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment summary */}
          <div className="space-y-3">
            <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded-xl bg-gray-100"
              >
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="h-5 w-32 bg-gray-300 rounded"></div>
              <div className="h-6 w-20 bg-gray-400 rounded"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default BillViewLoader
