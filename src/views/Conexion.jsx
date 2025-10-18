import React from "react";

import comidaAvianca from "../assets/comida.png";
import amenityKit from "../assets/neceser.png";
import insigniaLogo from "../assets/insignia.png";

// 1. Acepta el prop "onOpenExitModal" que le pasas desde Home.jsx
function Conexion({ onOpenExitModal }) {
  return (
    <section className="py-10 conexion">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* === Columna Izquierda (Imagen Grande) === */}
        <div className="md:w-1/2 w-full">
          <img
            src={comidaAvianca}
            alt="Bandeja con comida gourmet servida en un asiento de avión"
            className="w-full h-[300px] md:h-full object-cover rounded-3xl"
          />
        </div>

        {/* === Columna Derecha (Contenido) === */}
        <div className="md:w-1/2 w-full flex flex-col justify-between gap-10 md:pl-10">
          
          {/* Fila 1: Imagen Pequeña */}
          <div>
            <img
              src={amenityKit}
              alt="Pasajero recibiendo un kit de bienvenida en su asiento"
              className="w-full h-auto md:h-auto object-cover rounded-3xl md:block hidden"
            />
          </div>

          {/* Fila 2: Bloque de Texto y Botón */}
          <div className="flex flex-col items-start gap-6 px-2">
            <img
              src={insigniaLogo}
              alt="Logo de INSIGNIA by avianca"
              className="w-2/3 "
            />
            <p className="text-base text-start text-gray-700 leading-relaxed md:w-2/3">
              INSIGNIA by avianca es la forma en que avianca eleva la experiencia de volar. Un servicio premium que combina confort, exclusividad y atención personalizada en cada detalle.
              <br /><br />
              Aquí, viajar se siente diferente: más cómodo, más cercano y diseñado para ti.
            </p>
            {/* 2. Añade el evento onClick al botón para llamar a la función del prop */}
            <button 
              onClick={onOpenExitModal}
              className="bg-[#5e0000] text-white py-3 px-6 rounded-md hover:bg-[#4a0000] transition-colors duration-300 text-xl "
            >
              Conocer más sobre INSIGNIA
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Conexion;

