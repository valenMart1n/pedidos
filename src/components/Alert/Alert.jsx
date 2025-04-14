import React from "react"
import "./Alert.css";
import { Icon } from "../Icons"
import { faCheck, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons"
function Alert({ children, tipo = "check" }) { // Se da un valor por defecto a `tipo`
    return (
        <div className="alert-background">
            <div className="text-background">  
                <div className={`color-bar ${tipo}`}></div>
                <div className={`icon-background ${tipo}`}>
                    <Icon icon={tipo === "check" ? faCheck : faXmark} />
                </div>
                <b className="alert-text">{children}</b>
            </div>
        </div>
    );
}
export default Alert;