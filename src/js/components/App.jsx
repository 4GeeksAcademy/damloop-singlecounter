// ❌ ANTI-PATRÓN CRÍTICO: Uso de hooks no permitido en este ejercicio
// Este ejercicio específicamente NO debe usar useState ni useEffect
// El objetivo pedagógico es experimentar las limitaciones del enfoque manual
import React, { useState, useEffect } from "react";
import SecondsCounter from "./SecondsCounter.jsx";

// ⚠️ PROBLEMA PEDAGÓGICO: Este componente NO debería usar hooks
// Ver REVIEW.md para el enfoque correcto sin hooks
const App = () => {
    // ❌ Estos hooks NO deberían estar aquí según el objetivo del ejercicio
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    const [target, setTarget] = useState(null);
    const [countdownMode, setCountdownMode] = useState(false);

    // ✅ PATRÓN POSITIVO: Excelente implementación de useEffect
    // - Cleanup correcto con clearInterval (evita memory leaks)
    // - Dependencias apropiadas [running, countdownMode]
    // - Uso de prev => para evitar stale closures
    // PERO: Este ejercicio NO debe usar useEffect (objetivo pedagógico)
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
        // ✅ EXCELENTE: Cleanup que evita memory leak
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
