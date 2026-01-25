import React from "react";
import ReactDOM from "react-dom/client";

// Estilos globales
import "../styles/index.css";

// Componente principal del proyecto
import App from "./components/App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
