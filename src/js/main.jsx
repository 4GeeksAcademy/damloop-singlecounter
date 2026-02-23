import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "../styles/index.css";

let counter = 0;
let interval = null;
let countdownMode = false;
let alertAt = null;

const root = ReactDOM.createRoot(document.querySelector("#app"));

function startCounter() {
    stopCounter(); // evita duplicados

    interval = setInterval(() => {
        if (countdownMode) {
            counter--;
            if (counter <= 0) {
                counter = 0;
                stopCounter();
            }
        } else {
            counter++;
        }

        // ALERTA
        if (alertAt !== null && counter === alertAt) {
            alert("¡Has llegado al tiempo indicado!");
            alertAt = null; // evita alertas repetidas
        }

        render();
    }, 1000);
}

function stopCounter() {
    clearInterval(interval);
    interval = null;
}

function resetCounter() {
    counter = 0;
    countdownMode = false;
    alertAt = null;
    render();
}

function startCountdown(from) {
    countdownMode = true;
    counter = from;
    startCounter();
}

function setAlertAt(num) {
    alertAt = num;

    // Si ya estamos en ese número, avisar inmediatamente
    if (counter === alertAt) {
        alert("¡Has llegado al tiempo indicado!");
        alertAt = null;
    }
}

function render() {
    root.render(
        <App
            seconds={counter}
            onStart={startCounter}
            onStop={stopCounter}
            onReset={resetCounter}
            onCountdown={startCountdown}
            onAlert={setAlertAt}
        />
    );
}

startCounter();
render();
