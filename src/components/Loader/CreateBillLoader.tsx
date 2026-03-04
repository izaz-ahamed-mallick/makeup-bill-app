

const CreateBillLoader = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-brand-blush shadow-lg space-y-6">

        <div className="h-10 w-64 mx-auto shimmer rounded-lg"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-14 shimmer rounded-xl"></div>
          <div className="h-14 shimmer rounded-xl"></div>
          <div className="h-14 shimmer rounded-xl"></div>
          <div className="h-14 shimmer rounded-xl"></div>
          <div className="h-14 shimmer rounded-xl md:col-span-2"></div>
        </div>

        <div className="space-y-4">
          <div className="h-5 w-40 shimmer rounded"></div>
          <div className="h-12 shimmer rounded-xl"></div>
          <div className="h-12 shimmer rounded-xl"></div>
        </div>

      </div>
    </div>
  )
}

export default CreateBillLoader
