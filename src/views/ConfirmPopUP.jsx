import React, { useEffect } from "react";

function ConfirmPopUP({
    open = true,
    onClose = () => { },
    heading = "¡Reserva confirmada!",
    eventTitle = "After Office",
    dateTop = "Viernes",
    dateBottom = "31 de octubre",
    timeText = "19:00 - 19:45",
    closeText = "Cerrar",
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
        // si el click fue exactamente en el overlay (no dentro de la tarjeta)
        if (e.currentTarget === e.target) onClose();
    };

    return (
        <section
            role="dialog"
            aria-modal="true"
            aria-label="Confirmación de reserva"
            className={`fixed bg-white/60  inset-0 z-10 flex items-center justify-center p-4 ${overlayClass} popup-confirm`}
            onMouseDown={handleBackdropClick}
        >
            <div
                className={`w-[min(92vw,360px)] sm:w-[min(92vw,380px)] rounded-2xl shadow-xl ${cardClass} relative`}
            >
                {/* Contenido */}
                <div className="p-4 sm:p-5">
                    {/* Encabezado */}
                    <h2 className="text-center text-2xl leading-tight">
                        {heading}
                    </h2>
                    <div className="h-px w-full bg-white/30 my-2" />

                    {/* Título del evento */}
                    <h3 className="text-4xl text-start ">{eventTitle}</h3>

                    {/* Bloque fecha */}
                    <div className="flex items-stretch gap-2 ">
                        <div className="rounded-full p-2 flex items-center justify-center">
                            {/* Icono Calendario (SVG inline) */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-18 w-18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                        </div>

                        {/* Contenedor verde expandido */}
                        <div className="text-xl flex-1 flex flex-col justify-center items-start text-white rounded-md px-3 py-2">
                            <div>{dateTop}</div>
                            <div>{dateBottom}</div>
                        </div>
                    </div>

                    {/* Bloque hora */}
                    <div className="flex items-stretch gap-2">
                        <div className="rounded-full p-2">
                            {/* Icono Reloj (SVG inline) */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-18 w-18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 3" />
                            </svg>
                        </div>
                        <div className="text-xl flex-1 flex flex-col justify-center items-start text-white rounded-md px-3 py-2">{timeText}</div>
                    </div>

                    {/* Botón cerrar */}
                    <div className="flex justify-start">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md bg-[#e8d9cf] text-primary px-4 py-2 text-2xl font-medium shadow hover:opacity-90 focus:outline-none"
                        >
                            {closeText}
                        </button>
                    </div>
                </div>

                {/* Sombra inferior para simular relieve como en el diseño */}
                <div className="absolute inset-0 rounded-2xl shadow-[0_8px_18px_rgba(0,0,0,0.35)] pointer-events-none" />
            </div>
        </section>
    );
}

export default ConfirmPopUP;
