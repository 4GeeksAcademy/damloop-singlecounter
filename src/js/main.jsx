import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "../styles/index.css";

// Extraer constantes evita "numeros magicos" y aclara la intencion.
const COUNTER_INTERVAL_MS = 1000;
const ALERT_MESSAGE = "¡Has llegado al tiempo indicado!";

let counter = 0;
let intervalId = null;
let countdownMode = false;
let alertAt = null;
let isRunning = false;

const root = ReactDOM.createRoot(document.getElementById("app"));

function clearTimer() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }

    isRunning = false;
}

function tick() {
    if (countdownMode) {
        counter = Math.max(counter - 1, 0);

        if (counter === 0) {
            clearTimer();
        }
    } else {
        counter += 1;
    }

    if (alertAt !== null && counter === alertAt) {
        alert(ALERT_MESSAGE);
        alertAt = null;
    }

    render();
}

function startTimer() {
    if (intervalId !== null) return;

    isRunning = true;
    intervalId = setInterval(tick, COUNTER_INTERVAL_MS);
}

function startCounter() {
    clearTimer();
    counter = 0;
    countdownMode = false;
    alertAt = null;
    startTimer();
    render();
}

function stopCounter() {
    clearTimer();
    render();
}

function resumeCounter() {
    if (countdownMode && counter === 0) {
        countdownMode = false;
    }

    startTimer();
    render();
}

function resetCounter() {
    clearTimer();
    counter = 0;
    countdownMode = false;
    alertAt = null;
    render();
}

function startCountdown(from) {
    if (from < 0) return;

    countdownMode = true;
    counter = from;
    startTimer();
    render();
}

function setAlertAt(num) {
    if (num < 0) return;

    alertAt = num;

    if (counter === alertAt) {
        alert(ALERT_MESSAGE);
        alertAt = null;
    }
}

function render() {
    root.render(
        <App
            seconds={counter}
            isRunning={isRunning}
            onStart={startCounter}
            onStop={stopCounter}
            onResume={resumeCounter}
            onReset={resetCounter}
            onCountdown={startCountdown}
            onAlert={setAlertAt}
        />
    );
}

startTimer();
render();
