import React, { useState, useEffect } from "react";
import SecondsCounter from "./SecondsCounter.jsx";

const App = () => {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    const [target, setTarget] = useState(null);
    const [countdownMode, setCountdownMode] = useState(false);

    useEffect(() => {
        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setSeconds(prev => {
                    if (countdownMode) {
                        if (prev > 0) return prev - 1;
                        setRunning(false);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [running, countdownMode]);

    useEffect(() => {
        if (target !== null && seconds === target) {
            alert(`¡Has alcanzado ${target} segundos!`);
        }
    }, [seconds, target]);

    const start = () => {
        setRunning(true);
        setCountdownMode(false);
        setSeconds(0);
    };

    const stop = () => setRunning(false);
    const resume = () => setRunning(true);
    const reset = () => {
        setSeconds(0);
        setRunning(false);
        setCountdownMode(false);
    };

    const startCountdown = (value) => {
        setSeconds(value);
        setCountdownMode(true);
        setRunning(true);
        setTarget(0);
    };

    return (
        <div className="app-container">
            <SecondsCounter seconds={seconds} />

            <div className="controls">
                <button className="start" onClick={start}>Empezar</button>
                <button onClick={stop}>Parar</button>
                <button onClick={resume}>Reanudar</button>
                <button onClick={reset}>Reiniciar</button>
                <button onClick={() => startCountdown(10)}>Cuenta atrás desde 10</button>
                <button onClick={() => setTarget(10)}>Alerta en 10s</button>
            </div>
        </div>
    );
};

export default App;
