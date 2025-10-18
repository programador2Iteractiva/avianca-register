import React, { useEffect, useMemo, useState } from "react";
import insigniaLogo from "../assets/popUp.png"; // Imagen del After Office

const dataFechas = {
    "evento": "After Office",
    "descripcion": "Desconecta del día, conecta con nuevas historias. Un after office para brindar, compartir y disfrutar al ritmo de un DJ en vivo.",
    "fechas": [
        { "id": "oct-24", "etiqueta": "Oct 24", "horario": "19:00 - 19:45", "cupos": 20, "disponible": true },
        { "id": "oct-31", "etiqueta": "Oct 31", "horario": "19:00 - 19:45", "cupos": 12, "disponible": true },
        { "id": "nov-07", "etiqueta": "Nov 07", "horario": "19:00 - 19:45", "cupos": 10, "disponible": true }
    ]
};

function EventPopUp() {
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    const [seleccion, setSeleccion] = useState(dataFechas.fechas?.[0]?.id || null);
    const fechaActiva = useMemo(
        () => dataFechas.fechas.find((f) => f.id === seleccion),
        [seleccion]
    );

    return (
        <section
            className="fixed inset-0 flex items-center justify-center bg-white/60 p-3 z-10 popup-event"
            role="dialog"
            aria-modal="true"
            aria-label="Pop up de evento"
        >
            <div className="bg-primary rounded-2xl shadow-xl w-full max-w-[620px] md:max-w-5xl mx-auto  overflow-y-auto flex flex-col md:flex-row max-h-[80dvh] md:max-h-[88vh]">

                {/* === Columna Izquierda (Imagen + Texto superpuesto SIEMPRE) === */}
                <div className="md:w-1/2 w-full relative md:min-h-[420px]">
                    <img
                        src={insigniaLogo}
                        alt="Evento After Office Avianca"
                        className="w-full h-72 md:h-full object-cover p-5 rounded-4xl"
                    />
                    {/* Bloque de texto superpuesto con degradado para mobile y desktop */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 text-white m-5 text-start">
                        <h2 className="text-xl md:text-4xl mb-1 md:mb-2">
                            {dataFechas.evento}
                        </h2>
                        <div className="w-full h-0.5 my-5 bg-white" />

                        <p className="text-xs md:text-lg leading-snug md:leading-relaxed">
                            {dataFechas.descripcion}
                        </p>
                    </div>
                </div>

                {/* === Columna Derecha (Formulario) === */}
                <div className="md:w-1/2 w-full text-white flex flex-col justify-start px-4 py-5 md:px-8 md:py-10">
                    <h3 className="text-lg md:text-2xl hidden mb-4 md:mb-6">
                        Haz parte de este viaje con avianca
                    </h3>

                    <form className="flex flex-col gap-3 md:gap-4">
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="bg-transparent border-b border-gray-300 focus:outline-none py-1.5 md:py-2 text-sm placeholder-gray-200"
                        />
                        <input
                            type="text"
                            placeholder="Apellidos"
                            className="bg-transparent border-b border-gray-300 focus:outline-none py-1.5 md:py-2 text-sm placeholder-gray-200"
                        />
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            className="bg-transparent border-b border-gray-300 focus:outline-none py-1.5 md:py-2 text-sm placeholder-gray-200"
                        />
                        <input
                            type="tel"
                            placeholder="Número de teléfono"
                            className="bg-transparent border-b border-gray-300 focus:outline-none py-1.5 md:py-2 text-sm placeholder-gray-200"
                        />

                        {/* Botones de Fechas desde JSON */}
                        <div className="grid grid-cols-3 gap-2 md:gap-3 mt-2 md:mt-4">
                            {dataFechas.fechas.map((f) => {
                                const activa = f.id === seleccion;
                                const agotada = !f.disponible || f.cupos <= 0;

                                return (
                                    <button
                                        key={f.id}
                                        type="button"
                                        aria-pressed={activa}
                                        onClick={() => !agotada && setSeleccion(f.id)}
                                        disabled={agotada}
                                        className={[
                                            "rounded-md text-[11px] md:text-sm leading-tight px-2 py-1 md:px-3 md:py-2 border transition",
                                            activa
                                                ? "bg-secondary text-primary border-transparent"
                                                : "bg-white text-black hover:bg-gray-200 border-transparent",
                                            agotada ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                                        ].join(" ")}
                                    >
                                        {f.etiqueta}
                                        <br />
                                        {f.horario}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Checkbox + Cupos dinámicos */}
                        <div className="text-start">
                            <label className="flex items-center gap-2 text-xs md:text-sm mt-3 md:mt-4">
                                <input type="checkbox" className="accent-[#5e0000]" />
                                <span>Acepto términos y condiciones.</span>
                            </label>
                            <small className="text-[10px] md:text-xs text-gray-300">
                                {fechaActiva
                                    ? fechaActiva.cupos > 0
                                        ? `*Disponible ${fechaActiva.cupos} cupos`
                                        : "*Sin cupos para esta fecha"
                                    : "*Selecciona una fecha"}
                            </small>
                        </div>

                        {/* Botones finales */}
                        <div className="options flex gap-3 md:gap-4 mt-4 md:mt-6 text-primary">
                            <button
                                type="submit"
                                className="bg-secondary px-4 py-2 md:px-6 md:py-3 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!fechaActiva || !fechaActiva.disponible || fechaActiva.cupos <= 0}
                            >
                                Reserva tu lugar
                            </button>
                            <button
                                type="button"
                                className="bg-secondary border border-white px-4 py-2 md:px-6 md:py-3 rounded-md"
                            >
                                Home
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default EventPopUp;
