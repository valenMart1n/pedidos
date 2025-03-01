import React, { use, useContext, useEffect, useState } from "react";
import { Icon } from "../../Icons";
import "./OrderList.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../../contexts/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
function OrderList ({changeModal}){
    const [cart, setCart] = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const [nombre, setNombre] = useState("");
    
    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        setTotal(newTotal); // Actualiza el total
    }, [cart]);
    const sendMessagge = () =>{
        console.log(nombre);
        let url = "https://wa.me/" + 3435032467 + "?text=Hola soy " + nombre +", quisiera hacer un pedido de:%0a"+ cart.map((item, index) => (
            "-"+item.descripcion + " " + item.cantidad + " " + "x " + item.precio + " = " + item.precio*item.cantidad + "%0a"
        ))+"Total $" + total;
        window.open(url, "_blank");
    }
    const handleInputChange = (event) => {
        setNombre(event.target.value); // Actualiza el valor del estado
      };
    const removeItem = (id) => {
        setCart((currItems) => {
            if(currItems.find((item) => item.codigo === id)?.cantidad === 1){
                return currItems.filter((item) => item.codigo != id);
            }else{
                return currItems.map((item) => {
                    if(item.codigo === id){
                        return {...item, cantidad: item.cantidad -1};
                    }else{
                        return item;
                    }
                })
            }
        })
    }
    return(
        <div className="order-list-overlay">
            <div className="order-list-background">
                <div className="order-list-header"><input className="name-input" placeholder="Ingrese su nombre" value={nombre} onChange={handleInputChange} required></input><div className="cierre-order-list" onClick={() => changeModal(false)}><Icon icon={faXmark}/></div></div>
                <div className="order-list">
                <p className="order-title">Pedido</p>
                {cart.map((item, index) => (
                    
                    <p className="order-items">-{item.descripcion} {item.cantidad} x ${item.precio} = (${item.precio * item.cantidad}) <button onClick={() => removeItem(item.codigo)}className="delete-item"><Icon icon={faXmark}/></button> </p>
                    
                    
                ))}
              
                <div className="bar"></div>
                <p className="order-items">Total ${total}</p>

                </div>
                <div className="order-buttons">
                <button className="confirm-button" onClick={sendMessagge}>Confirmar Pedido</button>
                </div>
            </div>
        </div>
    );
};
export default OrderList;