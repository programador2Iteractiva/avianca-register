import React, { useState, useEffect } from 'react';
import Precarga from './Precarga';
import Home from './Home';

function HomeLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Configura un temporizador para cambiar el estado después de 3 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 milisegundos = 3 segundos

    // Limpia el temporizador si el componente se desmonta antes de tiempo
    return () => clearTimeout(timer);
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  // Muestra la pantalla de precarga mientras isLoading es true,
  // de lo contrario, muestra el contenido principal de Home.
  return isLoading ? <Precarga /> : <Home />;
}

export default HomeLoader;
