import React, { useRef, useState, useEffect } from "react";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

/**
 * Item de acordeón con animación de altura y accesibilidad ARIA.
 */
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
        <span className="text-base md:text-lg leading-snug">
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
      <div className="h-px w-full bg-[rgba(0,0,0,0.25)]" />

      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-[max-height] duration-400 ease-in-out"
      >
        <div ref={contentRef} className="py-4 pr-8 text-[15px] leading-relaxed text-black/80">
          {children}
        </div>
      </div>
    </div>
  );
}
