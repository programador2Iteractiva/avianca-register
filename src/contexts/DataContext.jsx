// src/contexts/DataContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// URL base de tu API
const BASE_URL = 'https://admin.latinoamericanaesavianca.com';

// 1. Crear el Contexto
const DataContext = createContext();

// 2. Crear el Proveedor de Datos
export const DataProvider = ({ children }) => {
  // --- Estado de Banners ---
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [errorBanners, setErrorBanners] = useState(null);

  // --- NUEVO: Estado de FAQs (Experiencias) ---
  const [faqs, setFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [errorFaqs, setErrorFaqs] = useState(null);

  // Efecto para cargar toda la data inicial
  useEffect(() => {
    // --- Función para cargar Banners ---
    const fetchBanners = async () => {
      setLoadingBanners(true);
      setErrorBanners(null);
      try {
        const config = {
          method: 'get',
          url: `${BASE_URL}/api/banners/`,
        };
        const response = await axios.request(config);

        if (response.data && !response.data.errors && response.data.data?.banners) {
          const processedBanners = response.data.data.banners.map(banner => ({
            ...banner,
            image: BASE_URL + banner.image,
            image_mobile: BASE_URL + banner.image_mobile,
          }));
          setBanners(processedBanners);
        } else {
          setErrorBanners(response.data.message || 'Error de formato en banners.');
          setBanners([]);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
        setErrorBanners(`Error de red: ${error.message}`);
        setBanners([]);
      } finally {
        setLoadingBanners(false);
      }
    };

    // --- NUEVA: Función para cargar FAQs (Experiencias) ---
    const fetchFaqs = async () => {
      setLoadingFaqs(true);
      setErrorFaqs(null);
      try {
        const config = {
          method: 'get',
          url: `${BASE_URL}/api/faqs/`,
        };
        const response = await axios.request(config);

        if (response.data && !response.data.errors && response.data.data?.questions) {
          // Procesar FAQs con la URL completa
          const processedFaqs = response.data.data.questions.map(faq => ({
            ...faq,
            image: BASE_URL + faq.image,
          }));
          setFaqs(processedFaqs);
        } else {
          setErrorFaqs(response.data.message || 'Error de formato en FAQs.');
          setFaqs([]);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setErrorFaqs(`Error de red: ${error.message}`);
        setFaqs([]);
      } finally {
        setLoadingFaqs(false);
      }
    };

    // Llamar a todas las funciones de carga
    fetchBanners();
    fetchFaqs(); // <- NUEVA LLAMADA

  }, []); // Carga solo una vez

  // 3. Valor general a proveer
  const value = {
    banners,
    loadingBanners,
    errorBanners,
    faqs, // <- NUEVO
    loadingFaqs, // <- NUEVO
    errorFaqs, // <- NUEVO
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// 4. Hook personalizado para consumir el contexto general
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData debe ser usado dentro de un DataProvider');
  }
  return context;
};