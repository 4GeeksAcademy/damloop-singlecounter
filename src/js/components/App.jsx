import React from "react";
import PropTypes from "prop-types";
import SecondsCounter from "./SecondsCounter.jsx";

const INPUT_IDS = {
    countdown: "countdownInput",
    alert: "alertInput"
};

function readNumberFromInput(inputId) {
    const input = document.getElementById(inputId);
    const value = Number.parseInt(input?.value ?? "", 10);

    if (Number.isNaN(value) || value < 0) return null;

    input.value = "";
    return value;
}

const App = ({
    seconds,
    isRunning,
    onStart,
    onStop,
    onResume,
    onReset,
    onCountdown,
    onAlert
}) => {
    return (
        <div className="app-container">
            <SecondsCounter seconds={seconds} />
            <p className="status-text">{isRunning ? "Running" : "Paused"}</p>

            <div className="controls">
                <button onClick={onStart}>Start</button>
                <button onClick={onStop} disabled={!isRunning}>
                    Stop
                </button>
                <button onClick={onResume} disabled={isRunning}>
                    Resume
                </button>
                <button onClick={onReset}>Reset</button>

                <input id={INPUT_IDS.countdown} type="number" placeholder="Cuenta atrás" />
                <button
                    onClick={() => {
                        const value = readNumberFromInput(INPUT_IDS.countdown);

                        if (value !== null) onCountdown(value);
                    }}
                >
                    Iniciar cuenta atrás
                </button>

                <input id={INPUT_IDS.alert} type="number" placeholder="Alerta en..." />
                <button
                    onClick={() => {
                        const value = readNumberFromInput(INPUT_IDS.alert);

                        if (value !== null) onAlert(value);
                    }}
                >
                    Activar alerta
                </button>
            </div>
        </div>
    );
};

App.propTypes = {
    seconds: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onStart: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onResume: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onCountdown: PropTypes.func.isRequired,
    onAlert: PropTypes.func.isRequired
};

export default App;
