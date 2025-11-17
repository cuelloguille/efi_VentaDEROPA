import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // necesario para Toasts

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />

    {/* Contenedor global para los Toasts */}
    <div aria-live="polite" aria-atomic="true" className="position-relative">
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        id="toastArea"
      ></div>
    </div>
  </React.StrictMode>
);
