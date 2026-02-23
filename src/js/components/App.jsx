import React from "react";
import SecondsCounter from "./SecondsCounter.jsx";

const App = ({ seconds, running, onStart, onStop, onResume, onReset }) => {
    return (
        <div className="app-container">
            <SecondsCounter seconds={seconds} />
            <p className="counter-status">{running ? "Running" : "Paused"}</p>

            <div className="controls">
                <button className="start" onClick={onStart}>Start</button>
                <button onClick={onStop} disabled={!running}>Stop</button>
                <button onClick={onResume} disabled={running}>Resume</button>
                <button onClick={onReset}>Reset</button>
            </div>
        </div>
    );
};

export default App;
