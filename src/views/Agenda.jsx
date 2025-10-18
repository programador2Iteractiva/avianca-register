// src/views/Agenda.jsx

// Importa los componentes y módulos de Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
// import afterOfficeImg from "../assets/header.png"; // <- Ya no se necesita

// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Importa íconos para las flechas
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// 1. IMPORTAR EL HOOK
import { useData } from "../contexts/DataContext";
import React from "react"; // Asegúrate de que React esté importado

function Agenda() {
  // 2. CONSUMIR DATOS DEL CONTEXTO
  const { events, loadingEvents, errorEvents } = useData();

  // 3. MANEJAR ESTADO DE CARGA
  if (loadingEvents) {
    return (
      <div className="view-container agenta">
        <h2>Agenda tu visita</h2>
        <div className="w-full flex flex-1 bg-[#5e0000] py-12 px-4 rounded-xl items-center justify-center h-[50dvh]">
          <p className="text-white text-2xl">Cargando eventos...</p>
        </div>
      </div>
    );
  }

  // 4. MANEJAR ESTADO DE ERROR
  if (errorEvents) {
    return (
      <div className="view-container agenta">
        <h2>Agenda tu visita</h2>
        <div className="w-full flex flex-1 bg-red-100 py-12 px-4 rounded-xl items-center justify-center h-[50dvh]">
          <p className="text-primary text-2xl">Error al cargar eventos: {errorEvents}</p>
        </div>
      </div>
    );
  }

  // 5. FILTRAR EVENTOS
  // (Opcional, pero buena práctica: filtra los que tengan al menos un horario)
  // En tu caso, la API parece no tener un flag `is_active`, así que usaremos todos.
  // Si necesitas filtrarlos, este es el lugar.
  const activeEvents = events.sort((a, b) => a.order - b.order);


  return (
    <div className="view-container agenta">
      <h2>Agenda tu visita</h2>
      <div className="w-full flex flex-1 bg-[#5e0000] py-12 px-4 rounded-xl">
        <div className="relative max-w-4/5 mx-auto">
          <div className="w-full ">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={false}
              slidesPerView={"auto"}
              speed={1200}
              coverflowEffect={{
                rotate: 0,
                stretch: 80,
                depth: 150,
                modifier: 2.5,
                slideShadows: false,
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                type: "progressbar",
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="event-carousel"
            >
              {/* 6. MAPEAR SOBRE LOS DATOS DINÁMICOS (activeEvents) */}
              {activeEvents.map((event) => (
                <SwiperSlide key={event.id}>
                  <div className="relative w-full h-full text-white rounded-lg overflow-hidden">
                    <img
                      src={event.image} // <- DATO DINÁMICO
                      alt={event.title} // <- DATO DINÁMICO
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-80% bg-opacity-40 flex flex-col justify-end items-start p-6 text-start">
                      <h3 className="text-4xl">{event.title}</h3> {/* <- DATO DINÁMICO */}
                      <p className="mt-1 text-sm">
                        {/* Usamos subtítulo, y si no existe, la descripción */}
                        {event.subtitle || event.description} {/* <- DATO DINÁMICO */}
                      </p>
                      <button className="mt-4 text-secondary border-1 rounded-lg border-secondary w-fit font-semibold px-8 py-2">
                        Reserva aquí
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div className="swiper-pagination"></div>
            </Swiper>
            <div className="absolute top-1/2 left-0 w-full flex justify-between px-2 z-10">
              <div className="swiper-button-prev">
                <FaChevronLeft />
              </div>
              <div className="swiper-button-next">
                <FaChevronRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agenda;