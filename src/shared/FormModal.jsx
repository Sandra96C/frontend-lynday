import { X } from "lucide-react";

function FormModal({ isOpen, onClose, children, size = "md" }) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[90vw]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`relative z-10 w-full ${sizes[size]} rounded-lg bg-white p-6  `}
      >
        <button className="absolute right-4 cursor-pointer" onClick={onClose}>
          <X />
        </button>

        {children}
      </div>
    </div>
  );
}

export default FormModal;
