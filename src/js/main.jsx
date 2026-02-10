import React from "react";
import ReactDOM from "react-dom/client";
import SecondsCounter from "./components/SecondsCounter.jsx";
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
            if (counter <= 0) stopCounter();
        } else {
            counter++;
        }

        if (alertAt !== null && counter === alertAt) {
            alert("¡Has llegado al tiempo indicado!");
        }

        render();
    }, 1000);
}

function stopCounter() {
    clearInterval(interval);
}

function resetCounter() {
    counter = 0;
    render();
}

function startCountdown(from) {
    countdownMode = true;
    counter = from;
    startCounter();
}

function setAlertAt(num) {
    alertAt = num;
}

function render() {
    root.render(
        <SecondsCounter
            seconds={counter}
            onStop={stopCounter}
            onStart={startCounter}
            onReset={resetCounter}
            onCountdown={startCountdown}
            onAlert={setAlertAt}
        />
    );
}

startCounter();
render();
