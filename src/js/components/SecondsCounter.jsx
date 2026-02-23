import React from "react";

function SecondsCounter({ seconds }) {
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
        <div className="bigCounter">
            <div className="clock">
                <i className="fa-regular fa-clock"></i>
            </div>

            {positionKeys.map((key, index) => (
                <div key={key} className="digit">
                    {formatted[index]}
                </div>
            ))}
        </div>
    );
}

export default SecondsCounter;
