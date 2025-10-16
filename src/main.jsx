import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Expectativa from "./pages/Expectativa";
import Precarga from "./pages/Precarga";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Expectativa />,
  },
  {
    path: "/precarga",
    element: <Precarga />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
