import React, { useContext, useEffect, useState } from "react";
import { Icon } from "../../Icons"; // Importa un componente de íconos personalizado
import "./OrderList.css"; // Importa los estilos CSS
import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons"; // Íconos de FontAwesome
import { CartContext } from "../../../contexts/ShoppingCartContext"; // Contexto del carrito
import useAlert from "../../Alert/useAlert";
function OrderList({ changeModal }) {
    const [cart, setCart] = useContext(CartContext); // Estado para manejar el carrito
    const [total, setTotal] = useState(0); // Estado para manejar el total del pedido
    const [nombre, setNombre] = useState(""); // Estado para manejar el nombre del usuario
    const [show, setShow] = useState(false); // Estado para mostrar advertencias
    const [verifyName, setVerifyName] = useState(false); // Estado para verificar si el nombre está vacío
    const [alerts, createToast] = useAlert();
    // Efecto para actualizar el total cuando cambia el carrito
    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        setTotal(newTotal); 
    }, [cart]);

    // Función para enviar un mensaje a WhatsApp con el pedido
    const sendMessagge = () => {
        if (cart.length === 0) { // Verifica si el carrito está vacío
            setShow(true);
        } else if (nombre === "") { // Verifica si el nombre está vacío
            setVerifyName(true);
        } else {
            let url = "https://wa.me/" + 3435032467 + "?text=Hola soy " + nombre + 
                      ", quisiera hacer un pedido de:%0a" + cart.map((item, index) => (
                          "-" + item.descripcion + " " + item.cantidad + " x " + item.precio + 
                          " = " + item.precio * item.cantidad + "%0a"
                      )) + "Total $" + total;
            window.open(url, "_blank"); // Abre la ventana de WhatsApp con el mensaje
        }
    };

    // Maneja los cambios en el campo de texto del nombre
    const handleInputChange = (event) => {
        setNombre(event.target.value);
    };

    // Función para eliminar un artículo del carrito
    const removeItem = (id) => {
        createToast({
            text: "Elemento eliminado",
            tipo: "cross"
        });
        setCart((currItems) => {
            if (currItems.find((item) => item.codigo === id)?.cantidad === 1) {
                return currItems.filter((item) => item.codigo !== id);
            } else {
                return currItems.map((item) => {
                    if (item.codigo === id) {
                        return { ...item, cantidad: item.cantidad - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    // Vaciar el carrito
    const emptyCart = () => {
        createToast({
            text: "Carrito Vaciado",
            tipo: "check"
        });
        setCart([]);
    };

    return (
        <div className="order-list-overlay">
            <div className="order-list-background">
                <div className="order-list-header">
                    <input 
                        className={`name-input ${verifyName}`} 
                        placeholder="Ingrese su nombre" 
                        value={nombre} 
                        onChange={handleInputChange} 
                        required 
                    />
                    <div className="cierre-order-list" onClick={() => changeModal(false)}>
                        <Icon icon={faXmark} />
                    </div>
                </div>
                
                <div className="order-list">
                    <p className="order-title">Pedido</p>
                    {cart.map((item, index) => (
                        <p key={index} className="order-items">
                            -{item.descripcion} {item.cantidad} x ${item.precio} = (${item.precio * item.cantidad}) 
                            <button onClick={() => removeItem(item.codigo)} className="delete-item">
                                <Icon icon={faXmark} />
                            </button>
                        </p>
                    ))}
                    <div className="bar"></div>
                    <p className="order-items">Total ${total}</p>
                </div>

                <div className="modal-footer">
                    <p className={`name-warning ${show}`}>El carrito está vacío</p>
                    <div className="order-buttons">
                        <button className="empty-button" onClick={emptyCart}>
                            <Icon icon={faTrash} />
                        </button>
                        <button className="modify-button" onClick={() => changeModal(false)}>Modificar</button>
                        <button className="confirm-button" onClick={sendMessagge}>Confirmar</button>
                    </div>
                </div>
            </div>
            {alerts}
        </div>
    );
}

export default OrderList;