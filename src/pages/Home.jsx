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
  // Estado para controlar qué evento se muestra en el popup
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Estado para mostrar la confirmación después de una reserva exitosa
  const [confirmationData, setConfirmationData] = useState(null);

  // Función para abrir el popup de un evento específico
  const handleReserveClick = (event) => {
    setSelectedEvent(event);
  };

  // Función para cerrar cualquier popup y limpiar estados
  const handleClosePopups = () => {
    setSelectedEvent(null);
    setConfirmationData(null);
  };

  // Función que se llama cuando una reserva es exitosa
  const handleReservationSuccess = (reservationDetails) => {
    setSelectedEvent(null); // Cierra el popup del formulario
    setConfirmationData(reservationDetails); // Abre el popup de confirmación
  };


  return (
    <div className="page ">
      <Navbar />
      <main>
        <Header />
        {/* Pasamos la función para abrir el popup a la Agenda */}
        <Agenda onReserveClick={handleReserveClick} />
        <Experiencias />
        <Conexion />
        <Mapa />
        
        {/* Renderizado condicional del popup del evento */}
        {selectedEvent && (
          <EventPopUp 
            event={selectedEvent} 
            onClose={handleClosePopups}
            onSuccess={handleReservationSuccess} 
          />
        )}
        
        {/* Renderizado condicional del popup de confirmación */}
        {confirmationData && (
          <ConfirmPopUP
            open={true}
            onClose={handleClosePopups}
            eventTitle={confirmationData.event.title}
            dateTop={confirmationData.formattedDate.day} // Viernes
            dateBottom={confirmationData.formattedDate.date} // 31 de octubre
            timeText={confirmationData.formattedDate.time} // 19:00 - 19:45
          />
        )}
        
        {/* <ExitModal /> */}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
