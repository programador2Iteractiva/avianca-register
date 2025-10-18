import React, { useEffect, useMemo, useState } from "react";
import { useData } from "../contexts/DataContext"; // Importar hook del contexto

// --- Funciones de ayuda para formato ---
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', timeZone: 'UTC' }).replace('.', '');
};

const formatTimeRange = (start, end) => {
  return `${start.substring(0, 5)} - ${end.substring(0, 5)}`;
};

const getFormattedDateTime = (schedule) => {
    if (!schedule) return {};
    const date = new Date(schedule.date);
    const optionsDay = { weekday: 'long', timeZone: 'UTC' };
    const optionsDate = { day: 'numeric', month: 'long', timeZone: 'UTC' };
    return {
        day: new Intl.DateTimeFormat('es-ES', optionsDay).format(date),
        date: new Intl.DateTimeFormat('es-ES', optionsDate).format(date),
        time: formatTimeRange(schedule.hour_start, schedule.hour_end)
    }
}

function EventPopUp({ event, onClose, onSuccess }) {
    const { createReservation, reservationStatus, clearReservationStatus } = useData();

    // --- Estados del formulario ---
    const [formData, setFormData] = useState({ name: '', lastname: '', email: '', phone: '' });
    const [selectedScheduleId, setSelectedScheduleId] = useState(event.schedule?.[0]?.id || null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formError, setFormError] = useState('');

    const activeSchedule = useMemo(
        () => event.schedule.find((s) => s.id === selectedScheduleId),
        [selectedScheduleId, event.schedule]
    );
    
    // Bloquear scroll del body
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        // Limpiar estado de reserva al montar
        clearReservationStatus();
        return () => {
            document.body.style.overflow = prev;
        };
    }, [clearReservationStatus]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(''); // Limpiar errores previos

        // Validaciones
        if (!formData.name || !formData.lastname || !formData.email || !formData.phone) {
            setFormError('Todos los campos son obligatorios.');
            return;
        }
        if (!termsAccepted) {
            setFormError('Debes aceptar los términos y condiciones.');
            return;
        }
        if (!selectedScheduleId) {
            setFormError('Debes seleccionar una fecha para el evento.');
            return;
        }

        const reservationData = {
            ...formData,
            terms: termsAccepted,
            event_id: event.id,
            schedule_id: selectedScheduleId,
        };

        try {
            const successData = await createReservation(reservationData);
            // Si tiene éxito, llama a la función onSuccess pasada por Home.jsx
            // y le pasa los datos necesarios para el popup de confirmación.
            if (successData && activeSchedule) {
                 onSuccess({
                    event: event,
                    schedule: activeSchedule,
                    formattedDate: getFormattedDateTime(activeSchedule)
                });
            }
        } catch (error) {
            setFormError(error.message);
        }
    };
    
    // Filtramos las fechas pasadas para no mostrarlas
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Para comparar solo fechas
    const upcomingSchedules = event.schedule.filter(s => new Date(s.date) >= today);


    return (
        <section
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 z-50 popup-event"
            role="dialog"
            aria-modal="true"
            aria-label={`Reservar para ${event.title}`}
            onMouseDown={(e) => e.target === e.currentTarget && onClose()} // Cierra al hacer clic en el fondo
        >
            <div className="bg-primary rounded-2xl shadow-xl w-full max-w-[620px] md:max-w-5xl mx-auto overflow-hidden flex flex-col md:flex-row max-h-[90dvh]">
                
                {/* === Columna Izquierda (Dinámica) === */}
                <div className="md:w-1/2 w-full relative md:min-h-[420px] h-72 md:h-auto ">
                    <img
                        src={event.image}
                        alt={`Imagen de ${event.title}`}
                        className="w-full h-full object-cover p-5 rounded-4xl "
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 text-white m-5 text-start bg-gradient-to-t from-black to-80% rounded-4xl ">
                        <h2 className="text-xl md:text-4xl mb-1 md:mb-2">{event.title}</h2>
                        <div className="w-full h-0.5 my-5 bg-white" />
                        <p className="text-xs md:text-lg leading-snug md:leading-relaxed">{event.description}</p>
                    </div>
                </div>

                {/* === Columna Derecha (Formulario) === */}
                <div className="md:w-1/2 w-full text-white flex flex-col justify-start px-4 py-5 md:px-8 md:py-10 overflow-y-auto">
                    <h3 className="text-lg md:text-2xl mb-4 md:mb-6 text-center md:text-left">
                        Haz parte de este viaje con avianca
                    </h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
                        <input name="name" type="text" placeholder="Nombre" onChange={handleInputChange} value={formData.name} className="bg-transparent border-b border-gray-300 focus:outline-none py-1.5 md:py-2 text-sm placeholder-gray-200" />
                        <input name="lastname" type="text" placeholder="Apellidos" onChange={handleInputChange} value={formData.lastname} className="bg-transparent border-b border-gray-300 focus:outline-none py-1.5 md:py-2 text-sm placeholder-gray-200" />
                        <input name="email" type="email" placeholder="Correo Electrónico" onChange={handleInputChange} value={formData.email} className="bg-transparent border-b border-gray-300 focus:outline-none py-1.5 md:py-2 text-sm placeholder-gray-200" />
                        <input name="phone" type="tel" placeholder="Número de teléfono" onChange={handleInputChange} value={formData.phone} className="bg-transparent border-b border-gray-300 focus:outline-none py-1.5 md:py-2 text-sm placeholder-gray-200" />

                        <div className="grid grid-cols-3 gap-2 md:gap-3 mt-2 md:mt-4">
                            {upcomingSchedules.length > 0 ? upcomingSchedules.map((schedule) => {
                                const isSelected = schedule.id === selectedScheduleId;
                                const isFull = schedule.quota <= schedule.registrants;
                                return (
                                    <button
                                        key={schedule.id}
                                        type="button"
                                        aria-pressed={isSelected}
                                        onClick={() => !isFull && setSelectedScheduleId(schedule.id)}
                                        disabled={isFull}
                                        className={`rounded-md text-[11px] md:text-sm leading-tight px-2 py-1 md:px-3 md:py-2 border transition ${isSelected ? "bg-secondary text-primary border-transparent" : "bg-white text-black hover:bg-gray-200 border-transparent"} ${isFull ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                    >
                                        {formatDate(schedule.date)}
                                        <br />
                                        {formatTimeRange(schedule.hour_start, schedule.hour_end)}
                                    </button>
                                );
                            }) : <p className="col-span-3 text-center text-sm">No hay fechas próximas para este evento.</p>}
                        </div>

                        <div className="text-start">
                            <label className="flex items-center gap-2 text-xs md:text-sm mt-3 md:mt-4">
                                <input type="checkbox" className="accent-secondary" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                                <span>Acepto términos y condiciones.</span>
                            </label>
                            <small className="text-[10px] md:text-xs text-gray-300">
                                {activeSchedule ? (activeSchedule.quota - activeSchedule.registrants > 0 ? `*Disponible ${activeSchedule.quota - activeSchedule.registrants} cupos` : "*Sin cupos para esta fecha") : "*Selecciona una fecha"}
                            </small>
                        </div>
                        
                        {(formError || reservationStatus.error) && <p className="text-red-300 text-sm mt-2">{formError || reservationStatus.error}</p>}

                        <div className="options flex gap-3 md:gap-4 mt-4 md:mt-6 text-primary">
                            <button
                                type="submit"
                                className="bg-secondary px-4 py-2 md:px-6 md:py-3 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={reservationStatus.loading || !activeSchedule || activeSchedule.quota <= activeSchedule.registrants}
                            >
                                {reservationStatus.loading ? 'Reservando...' : 'Reserva tu lugar'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-secondary/70 border border-white px-4 py-2 md:px-6 md:py-3 rounded-md hover:bg-secondary/90"
                            >
                                Cerrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default EventPopUp;
