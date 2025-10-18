// src/main.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Expectativa from "./pages/Expectativa";
import Precarga from "./pages/Precarga";
import Home from "./pages/Home";
import "./index.css";

// 1. Importa el DataProvider
import { DataProvider } from "./contexts/DataContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Expectativa />,
  },
  {
    path: "/precarga",
    element: <Precarga />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 2. Envuelve RouterProvider con DataProvider */}
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);