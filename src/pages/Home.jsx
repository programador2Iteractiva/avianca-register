import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../views/Header";
import Agenda from "../views/Agenda";
import Experiencias from "../views/Experiencias";
import Conexion from "../views/Conexion";
import Mapa from "../views/Mapa";
import EventPopUp from "../views/EventPopUp";
import ConfirmPopUP from "../views/ConfirmPopUP";
import ExitModal from "../views/ExitModal";

function Home() {
  // Estados para los popups de eventos
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);

  // --- NUEVO: Estado para controlar el ExitModal ---
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // Funciones para popups de eventos
  const handleReserveClick = (event) => {
    setSelectedEvent(event);
  };
  const handleClosePopups = () => {
    setSelectedEvent(null);
    setConfirmationData(null);
  };
  const handleReservationSuccess = (reservationDetails) => {
    setSelectedEvent(null);
    setConfirmationData(reservationDetails);
  };

  // --- NUEVO: Funciones para abrir y cerrar el ExitModal ---
  const handleOpenExitModal = () => setIsExitModalOpen(true);
  const handleCloseExitModal = () => setIsExitModalOpen(false);


  return (
    <div className="page ">
      <Navbar />
      <main>
        <Header />
        <Agenda onReserveClick={handleReserveClick} />
        <Experiencias />
        {/* Pasamos la función para abrir el ExitModal a Conexion */}
        <Conexion onOpenExitModal={handleOpenExitModal} />
        <Mapa />
        
        {/* Popups de eventos (sin cambios) */}
        {selectedEvent && (
          <EventPopUp 
            event={selectedEvent} 
            onClose={handleClosePopups}
            onSuccess={handleReservationSuccess} 
          />
        )}
        {confirmationData && (
          <ConfirmPopUP
            open={true}
            onClose={handleClosePopups}
            eventTitle={confirmationData.event.title}
            dateTop={confirmationData.formattedDate.day}
            dateBottom={confirmationData.formattedDate.date}
            timeText={confirmationData.formattedDate.time}
          />
        )}
        
        {/* --- NUEVO: Renderizado condicional del ExitModal --- */}
        {isExitModalOpen && (
          <ExitModal 
            open={isExitModalOpen} 
            onClose={handleCloseExitModal} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;

