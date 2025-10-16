import patron from "../assets/patron.png";
import starAlliance from "../assets/starAlliance.png";
import logos from "../assets/logos.png";

function Expectativa() {
  return (
    <div className="page expectativa text-white min-h-scree flex flex-col relative">
      <header className="p-5 my-5 flex justify-center ">
        <img src={logos} alt="Logos de Avianca y colaboradores" />
      </header>

      <main className="w-full flex-1 flex flex-col items-center text-start md:text-center justify-center md:gap-8 gap-2 px-4">
        <h1>Tu viaje por Latinoamérica empieza aquí</h1>

        <div className=" flex justify-center items-center w-full">
          <div
            alt="Ilustración de ventanas de avión cerradas"
            className="ventanasCerradas"
          />
        </div>

        <div>
          <p className="leading-5 md:leading-8 text-center">
            Muy pronto podrás reservar tu lugar  <br className="md:hidden" />  en esta experiencia única de
            avianca, <br />
            del 20 de octubre al 2 de noviembre <br className="md:hidden" /> en Calle Goya 36, Madrid
            (28001).
          </p>
        </div>
      </main>

      <div className="w-full">
        <div
          className="absolute bottom-0 left-0 w-full h-48 z-0"
          style={{ backgroundImage: `url(${patron})`, backgroundSize: "cover" }}
          aria-hidden="true"
        />

        <footer className="bg-blue-avianca md:bg-black relative z-10 py-3 flex justify-center w-full">
          <img src={starAlliance} alt="Logo de Star Alliance" className="w-32" />
        </footer>
      </div>
    </div>
  );
}

export default Expectativa;
