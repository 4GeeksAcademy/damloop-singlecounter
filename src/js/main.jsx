import React from "react";
import ReactDOM from "react-dom/client";

// Estilos globales
import "../styles/index.css";

// Componente principal del proyecto
import App from "./components/App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
const COUNTER_INTERVAL_MS = 1000;

let seconds = 0;
let running = true;
let intervalId = null;

function renderApp() {
    root.render(
        <React.StrictMode>
            <App
                seconds={seconds}
                running={running}
                onStart={handleStart}
                onStop={handleStop}
                onResume={handleResume}
                onReset={handleReset}
            />
        </React.StrictMode>
    );
}

function startInterval() {
    if (intervalId !== null) return;

    intervalId = setInterval(() => {
        seconds += 1;
        renderApp();
    }, COUNTER_INTERVAL_MS);
}

function stopInterval() {
    if (intervalId === null) return;

    clearInterval(intervalId);
    intervalId = null;
}

function handleStart() {
    seconds = 0;
    running = true;
    startInterval();
    renderApp();
}

function handleStop() {
    running = false;
    stopInterval();
    renderApp();
}

function handleResume() {
    running = true;
    startInterval();
    renderApp();
}

function handleReset() {
    seconds = 0;
    running = false;
    stopInterval();
    renderApp();
}

renderApp();
startInterval();
