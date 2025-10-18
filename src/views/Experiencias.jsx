import React, { useRef, useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useData } from "../contexts/DataContext"; // 1. Importar el hook

// --- Componente AccordionItem (Sin cambios) ---
function AccordionItem({ id, title, children, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

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

// --- Componente Accordion (MODIFICADO) ---
// Ya no maneja su propio estado, lo recibe por props
function Accordion({ items, openId, onToggle }) {
  // const [openId, setOpenId] = useState(null); // <-- ESTADO ELIMINADO
  
  // const toggle = (id) => { ... }; // <-- FUNCIÓN ELIMINADA

  return (
    <div className="w-full">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openId === item.id} // <-- Usa el prop openId
          onToggle={() => onToggle(item.id)} // <-- Usa el prop onToggle
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

// --- Componente Experiencias (MODIFICADO) ---
function Experiencias() {
  const { faqs, loadingFaqs, errorFaqs } = useData();

  // 2. LEVANTAR EL ESTADO: El ID abierto se maneja aquí
  const [openId, setOpenId] = useState(null);

  // Manejador de Carga
  if (loadingFaqs) {
    return (
      <div className="w-full experiencias opacity-50 p-5">
        <h2 className="text-4xl md:text-7xl mb-5">Cargando...</h2>
      </div>
    );
  }

  // Manejador de Error
  if (errorFaqs) {
    return (
      <div className="w-full experiencias p-5 bg-red-100">
        <h2 className="text-4xl md:text-7xl mb-5 text-primary">Error</h2>
        <p className="text-primary">{errorFaqs}</p>
      </div>
    );
  }

  // Procesamiento de datos
  const activeFaqs = faqs
    .filter(faq => faq.is_active)
    .sort((a, b) => a.order - b.order);

  const mainExperience = activeFaqs.length > 0 ? activeFaqs[0] : null;
  const accordionItemsData = activeFaqs.length > 1 ? activeFaqs.slice(1) : [];

  // Mapea los items para el componente Accordion
  const items = accordionItemsData.map(item => ({
    id: item.id,
    title: item.question,
    content: item.response
  }));

  // 3. LÓGICA DE IMAGEN DINÁMICA
  
  // Función para pasar al acordeón
  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Buscar el item de FAQ completo que coincida con el openId
  // Buscamos en TODOS los activeFaqs, no solo en los del acordeón
  const selectedItemData = activeFaqs.find(faq => faq.id === openId);

  // Determinar qué imagen mostrar
  const imageUrl = selectedItemData 
    ? selectedItemData.image // La imagen del item seleccionado
    : (mainExperience ? mainExperience.image : null); // La imagen por defecto (del primer item)

  // Determinar el texto 'aria-label' para la imagen
  const imageAriaLabel = selectedItemData
    ? selectedItemData.question
    : (mainExperience ? mainExperience.question : "Experiencias Avianca");

  const imageStyle = imageUrl
    ? { backgroundImage: `url(${imageUrl})` }
    : {}; // Si no hay, usa la de `index.css`

  return (
    <div className="w-full experiencias">
      <div className="flex flex-col md:flex-row md:items-start md:gap-6 ">
        {/* Columna izquierda */}
        <div className="flex flex-col flex-1 text-start px-5 md:py-10 mb-5">
          <h2 className="text-4xl md:text-7xl mb-5">Explora lo mejor de Latinoamérica</h2>
          <div className="w-full h-0.5 my-5 bg-black" />
          
          {/* Párrafo (sigue siendo el del primer item) */}
          <p className="mt-2 text-black/80">
            {mainExperience 
              ? mainExperience.response 
              : "Descubre a qué destino te conecta tu forma de viajar..."}
          </p>
          
          <div className="mt-10">
            {/* 4. Pasar el estado y el manejador al Acordeón */}
            <Accordion 
              items={items} 
              openId={openId} 
              onToggle={toggleAccordion} 
            />
          </div>
        </div>

        {/* Columna derecha (imagen) */}
        <div className="md:w-1/2 w-full">
          {/* 5. Aplicar el estilo y label dinámicos */}
          <div
            className="experiencias-image"
            style={imageStyle} 
            role="img"
            aria-label={imageAriaLabel} 
          />
        </div>
      </div>
    </div>
  );
}

export default Experiencias;