import React, { useEffect } from "react";
import aviones from "../assets/aviones.png"; // Imagen del After Office

function ExitModal({
  open = true,
  onClose = () => { },
  message = "Estás saliendo para conocer más sobre INSIGNIA by avianca",
  buttonText = "Regresar",
  exitUrl = "https://www.avianca.com/es/tu-reserva/business-class/avianca-insignia/", // URL de destino
  overlayClass = "bg-black/60 backdrop-blur-[1px]",
  cardClass = "bg-[#6b0000] text-white",
  closeOnBackdrop = true,
}) {

  // Efecto para la redirección automática después de 3 segundos
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        // Abrir la URL en una nueva pestaña
        window.open(exitUrl, '_blank', 'noopener,noreferrer');
        // Cerrar el modal después de la redirección
        onClose();
      }, 3000); // 3000 milisegundos = 3 segundos

      // Función de limpieza: se ejecuta si el componente se desmonta
      // o si 'open' cambia (ej: el usuario cierra el modal manualmente).
      // Esto cancela el temporizador y evita la redirección.
      return () => clearTimeout(timer);
    }
  }, [open, exitUrl, onClose]); // Dependencias del efecto

  // Efecto para cerrar con tecla Escape (sin cambios)
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClass} popup-exit`}
      onMouseDown={handleBackdropClick}
    >
      <div
        className={`w-[min(92vw,380px)] rounded-2xl shadow-xl ${cardClass} relative`}
      >
        <div className="p-5 flex flex-col items-center text-center gap-4">
          {/* Texto superior (actualizado para informar al usuario) */}
          <p className="text-lg leading-snug">{message}</p>

          {/* Iconos de avión */}
          <div className="flex items-center justify-center gap-6 my-2">
            <img
              src={aviones}
              alt="Iconos de aviones"
              className="w-full object-cover p-5 rounded-4xl"
            />
          </div>

          {/* Botón regresar (cierra el modal y cancela la redirección) */}
          <div className="flex items-center justify-center gap-4 w-full">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md bg-secondary/80 text-primary px-4 py-2 text-xl font-medium shadow hover:opacity-90 focus:outline-none"
            >
              {buttonText}
            </button>
          </div>
        </div>

        {/* Sombra de relieve */}
        <div className="absolute inset-0 rounded-2xl shadow-[0_8px_18px_rgba(0,0,0,0.35)] pointer-events-none" />
      </div>
    </section>
  );
}

export default ExitModal;

