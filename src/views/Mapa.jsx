import React from "react";

function Mapa() {
  return (
    <section className="w-full h-[50%] md:max-h-[50vh] como-llegar flex flex-col items-center py-10">
      <h2 className="text-4xl md:text-7xl mb-5 text-center">¿Cómo llegar?</h2>

      <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
        {/* Mapa embebido */}
        <iframe
          title="Mapa ubicación Avianca"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.649502094862!2d-3.6833085241407267!3d40.426203456269075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228e38e4b74fb%3A0xe7f64b1b0c66e2c1!2sCalle%20de%20Goya%2C%2036%2C%2028001%20Madrid!5e0!3m2!1ses!2ses!4v1696873944476!5m2!1ses!2ses"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[50vh] md:h-[60vh]"
        ></iframe>

        {/* Card superpuesta */}
        <div
          className="
          bg-[#7a0d0d] text-white p-6 md:rounded-xl shadow-lg 
          w-full md:w-72
          md:absolute md:top-8 md:right-8
        "
        >
          <h3 className="text-2xl text-center ">Vive la experiencia</h3>
          <div className="w-full h-0.5 my-2 md:my-5 bg-white" />
          <div className="text-start flex justify-between md:flex-col">
            <div className="w-full">
              <p>Calle Goya 36</p>
              <p>28001</p>
              <p className="mb-4">Madrid</p>
            </div>
            <div className="text-start w-full">
              <p className="font-semibold">Todos los días</p>
              <p>12:00 – 20:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mapa;
