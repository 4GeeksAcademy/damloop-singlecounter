import React from "react";

function SecondsCounter(props) {
    return (
        <div className="bigCounter">
            <div className="clock">
                <i className="fa-regular fa-clock"></i>
            </div>

            <div className="digit">{Math.floor(props.seconds / 100000) % 10}</div>
            <div className="digit">{Math.floor(props.seconds / 10000) % 10}</div>
            <div className="digit">{Math.floor(props.seconds / 1000) % 10}</div>
            <div className="digit">{Math.floor(props.seconds / 100) % 10}</div>
            <div className="digit">{Math.floor(props.seconds / 10) % 10}</div>
            <div className="digit">{props.seconds % 10}</div>

            <div className="controls">
                <button onClick={props.onStop}>Stop</button>
                <button onClick={props.onStart}>Resume</button>
                <button onClick={props.onReset}>Reset</button>

                <input
                    type="number"
                    placeholder="Countdown"
                    id="countdownInput"
                />
                <button
                    onClick={() => {
                        const value = parseInt(
                            document.querySelector("#countdownInput").value
                        );
                        if (!isNaN(value)) props.onCountdown(value);
                    }}
                >
                    Start Countdown
                </button>

                <input
                    type="number"
                    placeholder="Alert at"
                    id="alertInput"
                />
                <button
                    onClick={() => {
                        const value = parseInt(
                            document.querySelector("#alertInput").value
                        );
                        if (!isNaN(value)) props.onAlert(value);
                    }}
                >
                    Set Alert
                </button>
            </div>
        </div>
    );
}

export default SecondsCounter;
