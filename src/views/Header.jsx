import React from "react";

function Header() {
  return (
    <div className="header-container">
      <div className="flex flex-1  flex-col justify-end md:justify-center items-start ">
        <div className="md:max-w-1/3 max-w-3/4 flex flex-col gap-3 md:gap-5  ">
          <h1>
            Latinoamérica <br /> comienza aquí
          </h1>
          <h3>En este lugar empieza la emoción,<br className="block md:hidden" /> lo<br className="md:block hidden" /> siguiente es volar.</h3>
          <p>
            Del 20 de octubre al 2 de noviembre, Madrid se convierte en un punto
            de partida hacia 10 extraordinario. En nuestro Pop-up, ubicado en
            Calle Goya 36 (28C01), descubrirás sabores, sonidos y exgMiencias
            que te conectan con la esencia de viajar con avianca,
          </p>
          <button>
            Vive la experiencia
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
