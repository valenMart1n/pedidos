//
import React, {useState} from "react";
import './AmpliarButton.css';
import {Icon} from "../../Icons";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
function AmpliarButton(props){
   
     return(
    
        <div className="button-background">
          
            <div className={`button ${props.clicked ? "open" : ""}`}>
            <Icon css="ampliar" icon={props.clicked? faXmark : faPlus}/>
            </div>
        </div>
    );
}
export default AmpliarButton;