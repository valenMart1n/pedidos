import { useState } from "react";
import Alert from "./Alert";
import "./useAlert.css";

export default function useAlert(props) {
    const [list, setAlerts] = useState([]);

    const toast = (options) => {
        setAlerts((prev) => [...prev, options]); // Solución 1: Usar la versión de estado previa
        console.log('Lista actualizada', list);
        setTimeout(() => {
            setAlerts((prev) => prev.slice(1)); // Solución 2: Usar la versión previa en `setTimeout`
        }, 3000);
    };

    const alerts = (
        <div className="alert-container">
            {list.map((t, index) => {
                return <Alert tipo={t.tipo} key={index}>{t.text}</Alert> // Agregar `key` para evitar problemas de renderizado
                
            })}
        </div>
    );

    return [alerts, toast];
}