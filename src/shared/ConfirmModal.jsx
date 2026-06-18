import React from "react";
import { AlertTriangle, X } from "lucide-react";

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-lg !bg-[#faf8f3] p-6 text-left shadow-xl transition-all m-4 border border-[#d4c8b4]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7a6650] hover:text-[#4a3f30] cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full !bg-red-100 text-[#c0392b]">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="mt-0 text-left">
            <h3 className="text-lg font-medium leading-6 text-[#4a3f30]">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-[#7a6650]">{message}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[#d4c8b4] bg-transparent px-4 py-2 text-sm font-medium text-[#4a3f30] hover:bg-[#ede6d8] transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md !bg-[#c0392b] px-4 py-2 text-sm font-medium text-white hover:bg-[#c0392b]/90 shadow-sm transition-colors cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
