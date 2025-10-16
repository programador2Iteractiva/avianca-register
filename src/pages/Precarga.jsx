import patron from "../assets/patron.png";
import starAlliance from "../assets/starAlliance.png";
import logos from "../assets/logos.png";

function Precarga() {
  return (
    <div className="page precarga text-white min-h-scree flex flex-col relative">
      <header className="p-5 my-5 flex justify-center md:w-2/5 ">
        <img src={logos} alt="Logos de Avianca y colaboradores" />
      </header>

      <main className="w-full flex-1 flex flex-col items-center text-start md:text-center justify-center gap-6 px-4">
        <h1>Tu viaje por Latinoamérica empieza aquí</h1>

        <div className=" flex justify-center items-center w-full z-30 ">
          <div
            alt="Ilustración de ventanas de avión cerradas"
            className="ventanasCerradas"
          />
        </div>

        <div>
          <p className="leading-5 md:leading-8 font-bold text-center z-30 relative">
            En segundos podrás reservar tu experiencia{" "}
            <br className="md:hidden" /> con avianca,{" "}
            <br className="hidden md:block" />
            disponible del 20 de octubre <br className="md:hidden" /> al 2 de
            noviembre en Calle Goya 36, Madrid.
          </p>
        </div>
      </main>

      <div className="w-full z-20">
        <div
          className="absolute bottom-0 left-0 w-full h-48 z-0"
          style={{
            backgroundImage: `linear-gradient(to top, transparent, #5e0000), url(${patron})`,
            backgroundSize: "cover",
          }}
          aria-hidden="true"
        />

        <footer className="bg-blue-avianca md:bg-black relative z-10 py-3 flex justify-center w-full">
          <img
            src={starAlliance}
            alt="Logo de Star Alliance"
            className="w-32"
          />
        </footer>
      </div>
    </div>
  );
}

export default Precarga;
