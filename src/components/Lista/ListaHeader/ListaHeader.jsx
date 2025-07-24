import React, { useEffect, useState } from "react";
import './ListaHeader.css';

function ListaHeader(){

    
    return(
        <div className="lista-header-background">
            <div className="logo">
                <div className="logo-image"></div>
            </div>
            <div className="title">
                <b>Curcuma</b>
                <p>Paraná - Entre Ríos</p>
                <b>Versión de prueba utilizando datos de muestra</b>
            </div>
        </div>
    );
}
export default ListaHeader;