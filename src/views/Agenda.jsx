// Importa los componentes y módulos de Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import afterOfficeImg from "../assets/header.png";

// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Importa íconos para las flechas
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


function Agenda() {
   // Puedes mapear un array de datos para generar las tarjetas dinámicamente
  const events = [
    { id: 1, title: "Brunch", image: afterOfficeImg },
    { id: 2, title: "After Office", image: afterOfficeImg },
    { id: 3, title: "Cata de Vinos", image: afterOfficeImg },
    { id: 4, title: "Networking", image: afterOfficeImg },
    { id: 5, title: "Taller Creativo", image: afterOfficeImg },
  ];

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
              {events.map((event) => (
                <SwiperSlide key={event.id}>
                  <div className="relative w-full h-full text-white rounded-lg overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end items-start p-6">
                      <h3 className="text-4xl">{event.title}</h3>
                      <p className="mt-1 text-sm">
                        El plan perfecto para cerrar el día con estilo.
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

export default Agenda