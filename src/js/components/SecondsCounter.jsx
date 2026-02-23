import React from "react";
import { FaClock } from "react-icons/fa";

const SecondsCounter = ({ seconds }) => {
    const formatted = String(seconds).padStart(6, "0");
    const positionKeys = [
        "hundred-thousands",
        "ten-thousands",
        "thousands",
        "hundreds",
        "tens",
        "ones"
    ];

    return (
        <div>
            <div className="clock-icon">
                <FaClock />
            </div>

            <div className="counter-box">
                {positionKeys.map((position, index) => (
                    <div key={position} className="digit">{formatted[index]}</div>
                ))}
            </div>
        </div>
    );
};

export default SecondsCounter;
