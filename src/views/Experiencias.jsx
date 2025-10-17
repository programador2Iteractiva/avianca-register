import React, { useRef, useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";

function AccordionItem({ id, title, children, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Calcula la altura para animar suavemente
  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      const fullHeight = contentRef.current.scrollHeight;
      setHeight(fullHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="w-full">
      <button
        id={`accordion-header-${id}`}
        aria-controls={`accordion-panel-${id}`}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span
          className={`text-base md:text-lg leading-snug ${
            isOpen ? "text-primary font-semibold" : "text-black"
          }`}
        >
          {title}
        </span>
        <span
          className="shrink-0 transition-transform duration-300 ease-out"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <FiChevronRight size={22} />
        </span>
      </button>

      {/* Línea divisoria inferior */}
      <div className="h-0.5 w-full bg-[rgba(75,0,0,0.25)]" />

      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-[max-height] duration-400 ease-in-out"
      >
        <div
          ref={contentRef}
          className="py-4 pr-8 text-[15px] leading-relaxed text-black/80"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Accordion({ items }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openId === item.id}
          onToggle={() => toggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

function Experiencias() {
  const items = [
    {
      id: 1,
      title: "Sabores con alma latina",
      content:
        "Gastronomía que mezcla tradición y vanguardia. Desde mercados locales hasta restaurantes de autor, vive experiencias que despiertan los sentidos.",
    },
    {
      id: 2,
      title: "Eleva tu forma de volar a Latinoamérica",
      content:
        "Consejos, rutas y recomendaciones para planear tu viaje ideal: temporadas, clima, actividades imperdibles y tips para aprovechar cada destino.",
    },
    {
      id: 3,
      title: "Latinoamérica suena bien",
      content:
        "Festivales, música en vivo y ritmos que te acompañan en cada ciudad. Encuentra eventos y planes para disfrutar como un local.",
    },
  ];

  return (
    <div className="w-full experiencias">
      <div className="flex flex-col md:flex-row md:items-start md:gap-6 ">
        {/* Columna izquierda */}
        <div className="flex flex-col flex-1 text-start px-5 md:py-10 mb-5">
          <h2 className="text-4xl md:text-7xl mb-5">Explora lo mejor de Latinoamérica</h2>
          <div className="w-full h-0.5 my-5 bg-black" />
          <p className="mt-2 text-black/80">
            Descubre a qué destino te conecta tu forma de viajar y déjate
            sorprender al vivirlo de cerca.
          </p>
          <div className="mt-10">
            <Accordion items={items} />
          </div>
        </div>

        {/* Columna derecha (imagen) */}
        <div className="md:w-1/2 w-full">
          {/* El div de imagen usa background y controla su altura con aspect-ratio en mobile */}
          <div
            className="experiencias-image"
            role="img"
            aria-label="Personas viajando por Latinoamérica"
          />
        </div>
      </div>
    </div>
  );
}

export default Experiencias;
