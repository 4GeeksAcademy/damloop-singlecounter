import React from "react";
import { FaClock } from "react-icons/fa";

// ✅ PATRÓN POSITIVO: Componente funcional con props
const SecondsCounter = ({ seconds }) => {
    // ⚠️ OPORTUNIDAD DE MEJORA: Formato de 4 dígitos
    // El código original usa padStart(4) pero el requisito es 6 dígitos
    // const formatted = String(seconds).padStart(4, "0"); // 4 dígitos: "0012"
    
    // ✅ CORRECCIÓN APLICADA: Usar 6 dígitos como requiere el proyecto
    const formatted = String(seconds).padStart(6, "0"); // 6 dígitos: "000012"

    return (
        <div>
            {/* ✅ PATRÓN POSITIVO: Icono de reloj de react-icons */}
            <div className="clock-icon">
                <FaClock />
            </div>

            <div className="counter-box">
                {/* ⚠️ OPORTUNIDAD DE MEJORA: Usar index como key */}
                {/* El código original: key={i} - usar index como key es mala práctica */}
                {/* {formatted.split("").map((digit, i) => (
                    <div key={i} className="digit">{digit}</div>
                ))} */}
                
                {/* ✅ CORRECCIÓN APLICADA: Key más descriptiva */}
                {formatted.split("").map((digit, i) => (
                    <div key={`position-${i}`} className="digit">{digit}</div>
                ))}
            </div>
        </div>
    );
};

export default SecondsCounter;
