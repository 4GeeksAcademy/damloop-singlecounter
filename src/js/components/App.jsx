import React from "react";
import SecondsCounter from "./SecondsCounter.jsx";

const App = ({
    seconds,
    onStart,
    onStop,
    onReset,
    onCountdown,
    onAlert
}) => {
    return (
        <div className="app-container">
            <SecondsCounter seconds={seconds} />

            <div className="controls">
                <button onClick={onStart}>Start</button>
                <button onClick={onStop}>Stop</button>
                <button onClick={onStart}>Resume</button>
                <button onClick={onReset}>Reset</button>

                <input id="countdownInput" type="number" placeholder="Cuenta atrás" />
                <button
                    onClick={() => {
                        const value = parseInt(document.querySelector("#countdownInput").value);
                        if (!isNaN(value)) onCountdown(value);
                    }}
                >
                    Iniciar cuenta atrás
                </button>

                <input id="alertInput" type="number" placeholder="Alerta en..." />
                <button
                    onClick={() => {
                        const value = parseInt(document.querySelector("#alertInput").value);
                        if (!isNaN(value)) onAlert(value);
                    }}
                >
                    Activar alerta
                </button>
            </div>
        </div>
    );
};

export default App;
