import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const BASE_URL = 'https://admin.latinoamericanaesavianca.com';
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // --- Estados existentes ---
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [errorBanners, setErrorBanners] = useState(null);

  const [faqs, setFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [errorFaqs, setErrorFaqs] = useState(null);

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorEvents, setErrorEvents] = useState(null);

  // --- NUEVO: Estado y lógica para Reservas ---
  const [reservationStatus, setReservationStatus] = useState({
    loading: false,
    error: null,
    successData: null,
  });

  // Función para crear una reserva
  const createReservation = async (reservationData) => {
    setReservationStatus({ loading: true, error: null, successData: null });
    try {
      const config = {
        method: 'post',
        url: `${BASE_URL}/api/reservations/`,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(reservationData),
      };
      const response = await axios.request(config);

      if (response.data && !response.data.errors) {
        setReservationStatus({ loading: false, error: null, successData: response.data.data });
        return response.data.data; // Devuelve los datos en caso de éxito
      } else {
        throw new Error(response.data.message || 'Ocurrió un error al crear la reserva.');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error de red o servidor.';
      setReservationStatus({ loading: false, error: errorMessage, successData: null });
      throw new Error(errorMessage);
    }
  };
  
  // Función para limpiar el estado de la reserva (útil al cerrar popups)
  const clearReservationStatus = () => {
    setReservationStatus({ loading: false, error: null, successData: null });
  };


  // --- Efecto para cargar datos iniciales ---
  useEffect(() => {
    const fetchAllData = async () => {
      // Banners
      try {
        const resBanners = await axios.get(`${BASE_URL}/api/banners/`);
        if (resBanners.data && !resBanners.data.errors && resBanners.data.data?.banners) {
          setBanners(resBanners.data.data.banners.map(b => ({ ...b, image: BASE_URL + b.image, image_mobile: BASE_URL + b.image_mobile })));
        }
      } catch (e) { setErrorBanners(e.message); } 
      finally { setLoadingBanners(false); }
      
      // FAQs
      try {
        const resFaqs = await axios.get(`${BASE_URL}/api/faqs/`);
        if (resFaqs.data && !resFaqs.data.errors && resFaqs.data.data?.questions) {
          setFaqs(resFaqs.data.data.questions.map(f => ({ ...f, image: BASE_URL + f.image })));
        }
      } catch(e) { setErrorFaqs(e.message); }
      finally { setLoadingFaqs(false); }

      // Events
      try {
        const resEvents = await axios.get(`${BASE_URL}/api/events/`);
        if (resEvents.data && !resEvents.data.errors && resEvents.data.data?.events) {
          setEvents(resEvents.data.data.events.map(e => ({ ...e, image: BASE_URL + e.image, image_mail: BASE_URL + e.image_mail })));
        }
      } catch(e) { setErrorEvents(e.message); }
      finally { setLoadingEvents(false); }
    };
    
    fetchAllData();
  }, []);

  const value = {
    banners, loadingBanners, errorBanners,
    faqs, loadingFaqs, errorFaqs,
    events, loadingEvents, errorEvents,
    createReservation, // <- NUEVO
    reservationStatus, // <- NUEVO
    clearReservationStatus, // <- NUEVO
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
