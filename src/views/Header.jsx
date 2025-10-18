import React from "react";
import { useData } from "../contexts/DataContext"; // 1. Importar el hook del contexto

function Header() {
  // 2. Consumir los datos del contexto
  const { banners, loadingBanners, errorBanners } = useData();

  // 3. Manejar el estado de carga (respetando tu layout)
  if (loadingBanners) {
    return (
      <div className="header-container opacity-50">
        <div className="flex flex-1 flex-col justify-end md:justify-center items-start">
          <div className="md:max-w-1/3 max-w-3/4 flex flex-col gap-3 md:gap-5">
            <h1 className="text-start">Cargando...</h1>
            <h3>...</h3>
          </div>
        </div>
      </div>
    );
  }

  // 4. Manejar el estado de error
  if (errorBanners) {
    return (
      <div className="header-container items-center justify-center bg-red-200">
        <h1 className="text-primary">Error al cargar el banner:</h1>
        <p className="text-primary">{errorBanners}</p>
      </div>
    );
  }

  // 5. Encontrar el primer banner activo
  const activeBanner = banners.find(banner => banner.is_active);

  // 6. Preparar los datos (el fallback es tu HTML original exacto)
  const dataToShow = {
    title: activeBanner ? activeBanner.title : "Latinoamérica <br /> comienza aquí",
    subtitle: activeBanner ? activeBanner.subtitle : "En este lugar empieza la emoción,<br className=\"block md:hidden\" /> lo<br className=\"md:block hidden\" /> siguiente es volar.",
    image: activeBanner ? activeBanner.image : null // La URL ya viene procesada
  };

  // 7. Definir el estilo de fondo dinámico
  const headerStyle = dataToShow.image
    ? { backgroundImage: `url(${dataToShow.image})` }
    : {};

  return (

    <div className="header-container">
      <div className="flex flex-1  flex-col justify-end md:justify-center items-start ">
        <div className="md:max-w-1/3 max-w-3/4 flex flex-col gap-3 md:gap-5  ">
          {/* 10. Usamos dangerouslySetInnerHTML para renderizar los <br /> */}
          <h1
            className="md:text-start"
            dangerouslySetInnerHTML={{ __html: dataToShow.title }}
          />
          <h3
            dangerouslySetInnerHTML={{ __html: dataToShow.subtitle }}
          />

          {/* El párrafo y el botón permanecen estáticos (tal como en tu original) */}
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