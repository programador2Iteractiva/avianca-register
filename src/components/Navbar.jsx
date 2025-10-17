// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import logos from "../assets/logos.png";
import { IoMenu, IoCloseSharp } from "react-icons/io5";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // abre por defecto en desktop; cerrado en mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOpen(window.innerWidth >= 768);
    }
  }, []);
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(true);
      else setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    { id: 1, name: "Nuestro Pop Up", href: "#popup" },
    { id: 2, name: "Reservas", href: "#reservas" },
    { id: 3, name: "Experiencias", href: "#experiencias" },
    { id: 4, name: "¿Cómo llegar?", href: "#como-llegar" },
  ];

  return (
    <header className="navbar-root fixed top-0 left-0 w-full z-[60]">
      {/* Barra roja superior */}
      <div className="w-full h-12 md:h-14 bg-[#7a0d0d] text-white px-4 md:px-6 flex items-center justify-between">
        <img
          src={logos}
          alt="Logos de Avianca y colaboradores"
          className="w-[10.75rem] md:w-[17rem] select-none"
        />

        {/* botón desktop (X/☰) alineado a la derecha como en el mock */}
        <button
          type="button"
          className="hidden md:flex items-center justify-center"
          onClick={() => setIsOpen((p) => !p)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          title={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? (
            <IoCloseSharp className="w-6 h-6" />
          ) : (
            <IoMenu className="w-6 h-6" />
          )}
        </button>

        {/* botón mobile */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center"
          onClick={() => setIsOpen((p) => !p)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          title={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? (
            <IoCloseSharp className="w-8 h-8" />
          ) : (
            <IoMenu className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* --------- DESKTOP: banda beige idéntica al mockup --------- */}
      <div
        className={`hidden md:block w-full transition-[max-height,opacity,transform] duration-300 ${
          isOpen
            ? "max-h-24 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="px-3 md:px-6">
          {/* contenedor sombra y bordes exactos */}
          <nav className="desktop-band mx-auto max-w-[1080px] h-12 mt-[6px] rounded-[12px] overflow-hidden">
            <ul className="h-full w-full flex items-center justify-center">
              {links.map((link, idx) => (
                <li key={link.id} className="flex items-center">
                  <a
                    href={link.href}
                    className="desktop-link px-3 py-2 text-[15px]"
                  >
                    {link.name}
                  </a>
                  {idx < links.length - 1 && (
                    <span className="separator" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* --------- MOBILE: overlay + tarjeta beige con líneas --------- */}
      <div
        className={`md:hidden fixed inset-0 top-12 bg-black/55 backdrop-blur-[1.5px] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="w-full h-full flex items-start justify-center pt-4">
          {/* tarjeta beige igual a la imagen */}
          <nav className="mobile-card w-[88%] rounded-[16px] px-5 py-5">
            <ul className="flex flex-col">
              {links.map((link, idx) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-[30px] leading-[2.6rem] tracking-[0.2px]"
                  >
                    {link.name}
                  </a>
                  {idx < links.length - 1 && (
                    <div className="mobile-hr my-[10px]" />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
