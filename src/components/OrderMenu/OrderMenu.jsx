import React, { useContext, useState} from "react";
import './OrderMenu.css';
import { Icon } from "../Icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { CartContext } from "../../contexts/ShoppingCartContext";
import OrderList from "./OrderList/OrderList";

function OrderMenu() {
    const [cart, setCart] = useContext(CartContext);
    const [showModal, changeModal] = useState(false);
    
/*Para ir acumulando el total se usa el reduce como contador que recibe como parametros una funcion
que tiene un acumulador y el objeto actual y el numero 0 que es desde donde arranca el contador*/
    const total = (cart ? cart.reduce((acc, curr) =>{
        return acc + curr.cantidad;
    }, 0): console.log("Esta vacio"));
    
    return(
    <div className="order-menu-background">
        <div className="order"><button className="cart-button"><Icon icon={faCartShopping} css="cart-icon"/>({total})</button>
        <button className="whatsapp-button"><Icon icon={faWhatsapp} css="message-icon"/>Enviar pedido</button>
        </div>  
    </div>
    );
}
export default OrderMenu;