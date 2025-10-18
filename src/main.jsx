import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Expectativa from "./pages/Expectativa";
// Se importa Precarga aquí por si lo usas en otras rutas, pero no es estrictamente necesario
import Precarga from "./pages/Precarga"; 
// Se elimina la importación directa de Home, ya que HomeLoader lo maneja
// import Home from "./pages/Home"; 
import "./index.css";
import { DataProvider } from "./contexts/DataContext";

// 1. Importa el nuevo componente HomeLoader
import HomeLoader from "./pages/HomeLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Expectativa />,
  },
  {
    path: "/precarga",
    element: <Precarga />, // La ruta /precarga sigue funcionando por si la necesitas de forma independiente
  },
  {
    path: "/home",
    element: <HomeLoader />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
