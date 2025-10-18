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

  // --- (Aquí puedes añadir más estados para otra data) ---
  // const [agenda, setAgenda] = useState([]);
  // const [loadingAgenda, setLoadingAgenda] = useState(true);
  // const [errorAgenda, setErrorAgenda] = useState(null);

  // Efecto para cargar toda la data inicial
  useEffect(() => {
    // Función para cargar Banners
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
          // Procesar banners con la URL completa
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

    // --- (Aquí puedes llamar a más funciones de fetch) ---
    // const fetchAgenda = async () => { ... };

    // Llamar a todas las funciones de carga
    fetchBanners();
    // fetchAgenda();

  }, []); // Carga solo una vez al montar la app

  // 3. Valor general a proveer
  const value = {
    banners,
    loadingBanners,
    errorBanners,
    // ...agenda,
    // ...loadingAgenda,
    // ...errorAgenda,
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