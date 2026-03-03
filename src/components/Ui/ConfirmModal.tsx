interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  open,
  title = "Confirm Action",
  message,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-brand-blush animate-fadeIn">

        <h3 className="text-2xl font-semibold text-brand-rose font-[Playfair Display] text-center">
          {title}
        </h3>

        <div className="w-16 h-[2px] bg-brand-gold mx-auto mt-3 mb-6"></div>

        <p className="text-brand-text text-center leading-relaxed">
          {message}
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onCancel}
            className="flex-1 min-h-[48px] rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white transition-all duration-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 min-h-[48px] rounded-full bg-brand-rose text-white hover:opacity-90 transition-all duration-300"
          >
            Confirm
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;
