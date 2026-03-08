import React from "react";
import PropTypes from "prop-types";
import { FaRegClock } from "react-icons/fa";

const COUNTER_DIGITS = 6;

function SecondsCounter({ seconds }) {
    const formatted = String(seconds).padStart(COUNTER_DIGITS, "0");

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
                <FaRegClock aria-hidden="true" />
            </div>

            {positionKeys.map((key, index) => (
                <div key={key} className="digit">
                    {formatted[index]}
                </div>
            ))}
        </div>
    );
}

SecondsCounter.propTypes = {
    seconds: PropTypes.number.isRequired
};

export default SecondsCounter;
