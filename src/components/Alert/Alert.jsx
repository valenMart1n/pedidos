import React from "react"
import "./Alert.css";
import { Icon } from "../Icons"
import { faCheck, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons"

export const Alert = (props) =>{
    <div className="alert-background">
        {
          props.tipo === "check" ? (
            <div>
            <div className="color-bar check"></div>
            <Icon icon={faCheck} />
            </div>
        ) : props.tipo === "cross" ? (
            <div>
            <div className="color-bar cross"></div>
            <Icon icon={faXmark}/>
            </div>
        ) : (
            <div>
            <div className="color-bar warning"></div>
            <Icon icon={faTriangleExclamation}/>
            </div>
        )}
    </div>
}