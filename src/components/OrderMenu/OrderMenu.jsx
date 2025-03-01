import React, { useContext, useState } from "react";
import './OrderMenu.css';
import { Icon } from "../Icons"; // Componente de íconos personalizado
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"; // Ícono de carrito
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"; // Ícono de WhatsApp
import { CartContext } from "../../contexts/ShoppingCartContext"; // Contexto del carrito

function OrderMenu() {
    const [cart, setCart] = useContext(CartContext); // Estado para manejar el carrito

    /* Para ir acumulando el total se usa el reduce como contador que recibe como parámetros 
    una función que tiene un acumulador y el objeto actual y el número 0 que es desde donde arranca el contador */
    const total = (cart ? cart.reduce((acc, curr) => {
        return acc + curr.cantidad;
    }, 0) : console.log("Está vacío"));
    
    return (
        <div className="order-menu-background">
            <div className="order">
                <button className="cart-button">
                    <Icon icon={faCartShopping} css="cart-icon" />({total})
                </button>
                <button className="whatsapp-button">
                    <Icon icon={faWhatsapp} css="message-icon" />Enviar pedido
                </button>
            </div>  
        </div>
    );
}

export default OrderMenu;