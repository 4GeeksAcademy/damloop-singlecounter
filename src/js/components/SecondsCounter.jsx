import React from "react";
import { FaClock } from "react-icons/fa";

const SecondsCounter = ({ seconds }) => {
    const formatted = String(seconds).padStart(4, "0");

    return (
        <div>
            <div className="clock-icon">
                <FaClock />
            </div>

            <div className="counter-box">
                {formatted.split("").map((digit, i) => (
                    <div key={i} className="digit">{digit}</div>
                ))}
            </div>
        </div>
    );
};

export default SecondsCounter;
