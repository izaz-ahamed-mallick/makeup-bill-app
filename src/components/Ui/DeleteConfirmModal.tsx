interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({ open, onCancel, onConfirm }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-brand-blush">

        <div className="flex flex-col items-center text-center">

          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6 7h12M9 7v10m6-10v10M10 3h4m-7 4h14l-1 13H5L4 7z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-semibold text-brand-text">
            Delete Booking
          </h3>

          <p className="text-sm text-gray-500 mt-3">
            This action cannot be undone. Are you sure you want to delete this booking?
          </p>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onCancel}
            className="flex-1 min-h-[48px] rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 min-h-[48px] rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;
