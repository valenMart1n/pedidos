import {useContext, useState} from "react";
import "./ListaModal.css";
import {Icon} from "../../Icons";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../../contexts/ShoppingCartContext";

const ListaModal = ({changeModal, product}) => {
const [quantity, setQuantity] = useState(1);
const [cart, setCart] = useContext(CartContext);

const append = (prevQuantity) => {
    setQuantity(prevQuantity + 1);
}
const prepend = (prevQuantity) => {
    if(prevQuantity > 1){
    setQuantity(prevQuantity - 1);
    }
}
const addProducts = (product) => {
    setCart((currItems) => {
      
      const isItemFound = currItems.find((item) => item.codigo === product.codigo);
      if(isItemFound){
        return currItems.map((item) => 
        item.codigo === product.codigo 
            ? {...item, cantidad: item.cantidad +quantity}
            : item
        );
      }else{
        return [...currItems, {...product, cantidad: quantity}];
      }
          }); 
    };
  
  

    return(
        
        <div className="overlay">
            <div className="list-modal">
                <div className="list-modal-header">
                    Agregar al Pedido
                    <div onClick={()=> changeModal(false)}>
                    <Icon css="cruz" icon={faXmark}/>
                    </div>
                </div>
                <form>
                    <div className="form-fields">
                    <b>Nombre</b>
                    <input className="form-input" placeholder={product.descripcion} readOnly></input>
                    </div>
                    <div className="form-fields">
                    <b>Precio $</b>
                    <input className="form-input" placeholder={product.precio} readOnly></input>
                    </div>
                    <div className="form-fields">
                    <b>Cantidad</b>
                    <div className="form-quantity">
                    <button type="button"className="form-quantity-button" onClick={(e) =>  {
                        e.preventDefault();
                        prepend(quantity)}}>
                        <Icon icon={faMinus}/>
                    </button>
                    <input className="form-quantity-input"inputMode="decimal" value={quantity} placeholder></input>
                    <button type="button"className="form-quantity-button" onClick={() => append(quantity)}><Icon icon={faPlus}/></button>
                    
                    </div>
                    </div>
                    <div className="form-actions"> 
                    <button className="close-button" type="button" onClick={()=> changeModal(false)}>Cerrar</button>
                    <button className="add-button" type="button" onClick={() => addProducts(product)}>Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ListaModal;