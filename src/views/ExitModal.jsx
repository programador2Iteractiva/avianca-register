import React, { useEffect } from "react";
import aviones from "../assets/aviones.png"; // Imagen del After Office

function ExitModal({
  open = true,
  onClose = () => { },
  message = "Estás saliendo para conocer más sobre INSIGNIA by avianca.",
  buttonText = "Regresar",
  overlayClass = "bg-black/60 backdrop-blur-[1px]",
  cardClass = "bg-[#6b0000] text-white",
  closeOnBackdrop = true,
}) {
  // Cerrar con tecla Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (!closeOnBackdrop) return;
    if (e.currentTarget === e.target) onClose();
  };

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-label="Confirmación de salida"
      className={`fixed inset-0 bg-white/60  z-10 flex items-center justify-center p-4 ${overlayClass} popup-exit`}
      onMouseDown={handleBackdropClick}
    >
      <div
        className={`w-[min(92vw,380px)] rounded-2xl shadow-xl ${cardClass} relative`}
      >
        <div className="p-5 flex flex-col items-center text-center gap-4">
          {/* Texto superior */}
          <p className="text-lg leading-snug">{message}</p>

          {/* Iconos de avión (3 en fila) */}
          <div className="flex items-center justify-center gap-6 my-2">
            <img
              src={aviones}
              alt="Evento After Office Avianca"
              className="w-full object-cover p-5 rounded-4xl"
            />
          </div>

          {/* Botón regresar */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-secondary text-primary px-6 py-1 text-2xl font-medium shadow hover:opacity-90 focus:outline-none"
          >
            {buttonText}
          </button>
        </div>

        {/* Sombra de relieve */}
        <div className="absolute inset-0 rounded-2xl shadow-[0_8px_18px_rgba(0,0,0,0.35)] pointer-events-none" />
      </div>
    </section>
  );
}

export default ExitModal;
