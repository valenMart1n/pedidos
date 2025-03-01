import React, { useEffect, useState } from "react";
import './Lista.css';
import ListaHeader from "./ListaHeader/ListaHeader";
import { Icon } from "../Icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import AmpliarButton from "./AmpliarButton/AmpliarButton";
import ListaModal from "./ListaModal/ListaModal";
import OrderList from "../OrderMenu/OrderList/OrderList";
import OrderMenu from "../OrderMenu/OrderMenu";

function Lista() {
    const [categoriasArray, setCategoriasArray] = useState([]);//Array con las categorias
    const [productosArray, setProductosArray] = useState([]);//Array de los productos a mostrar
    const [expandedRows, setExpandedRows] = useState([]);//Filas Expandidas
    const [showModal1, changeModal1] = useState(false); //Mostrar modal del producto
    const [selectedProduct, setSelectedProduct] = useState(null);//Datos del producto seleccionado
    const [busqueda, setBusqueda] = useState("");//Almacena lo ingresado en la barra de busqueda
    const [productosOriginales, setProductosOriginales] = useState([]);//Recupera le array con todos los productos (sin filtros)
    const [mostrarOrden, setMostrarOrden] = useState(false);//Mostrar modal de cada pedido
    
   
    useEffect(() => {
        const requestInit = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch("http://localhost:3030/categorias", requestInit)
            .then(res => {
                if (!res.ok) {
                    throw new Error("La petición no fue exitosa");
                }
                return res.json();
            })
            .then(res => {
                setCategoriasArray(res);
            })
            .catch(error => {
                console.error("Error en la base: ", error);
            });
    }, []);
    
    useEffect(() => {
        const requestInit = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        fetch("http://localhost:3030/productos", requestInit)
            .then(res => {
                if (!res.ok) {
                    throw new Error("La petición no fue exitosa");
                }
                return res.json();
            })
            .then(res => {
                setProductosArray(res);
                setProductosOriginales(res);
            })
            .catch(error => {
                console.error("Error en la base: ", error);
            });
    }, []);
   
    
    const handleExpandClick = (index) => {
        
        setExpandedRows((currExpandedRows) => {
            if (currExpandedRows.includes(index)) {
               
                return currExpandedRows.filter(rowIndex => rowIndex !== index);
            } else {
               
                return [...currExpandedRows, index];
            }
        });
    };
    const handleModalOpen = (producto) => {
        setSelectedProduct(producto);
        changeModal1(true);
        
    };
    
    const buscar = e => {
       const valor = e.target.value;
       setBusqueda(e.target.value);
        const productosFiltrados = productosOriginales.filter(producto =>
            producto.descripcion.toLowerCase().includes(valor.toLowerCase())
        );
        setProductosArray(productosFiltrados);
    }

    return (
        
        <div className="lista-background">
              
            <ListaHeader />
            <div className="seccion-1">
                <select className="categorias"
                onChange={(e) => {
                    const selectedCategoria = categoriasArray[e.target.selectedIndex];
                    if(selectedCategoria){
                        if(e.target.selectedIndex == 0){
                              setProductosArray(productosOriginales);
                        }else{
                        const productosFiltrados = productosOriginales.filter(producto =>
                            
                            producto.rubro == e.target.selectedIndex
                        );
                        
                        setProductosArray(productosFiltrados);
                }}}}>
                    <option> Todas las categorias</option>
                    {categoriasArray.map((categoria, index) => (
                        <option key={index}>{categoria.nombre}</option>
                ))}
                </select>
            </div>
            <div className="seccion-2">
                <input className="search-bar" placeholder="Buscar..." value={busqueda}
                onChange={buscar}/>
            </div>
            <div className="table-container">
                <table className="tabla" border="1">
                    <thead className="tabla-header">
                        <tr>
                            <th className="table-title">Nombre</th>
                            <th className="table-title">Precio</th>
                            <th className="table-title">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosArray.map((producto, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className="table-content" style={{ textAlign: "left", display: "flex", alignItems: "center", width: "100%" }} onClick={() => handleExpandClick(index)}>
                                        <AmpliarButton clicked={expandedRows.includes(index)}/>
                                        {producto.descripcion}
                                    </td>
                                    <td className="table-content"style={{width: "25%"}}>{producto.precio}</td>
                                    <td className="table-content" style={{width: "25%"}}>
                                        <div className="pedir-button" onClick={()=> handleModalOpen(producto)}>
                                            <Icon css="icon" icon={faMinus} />Pedir<Icon css="icon" icon={faPlus} />
                                            
                                        </div>
                                    </td>
                                </tr>
                                {expandedRows.includes(index) && (
                                    <tr>
                                        <td colSpan="3">
                                             Categoria: {categoriasArray[producto.rubro-1].nombre}
                                             
                                        </td>
                                        
                                    </tr>
                                    
                                )}
                                
                            </React.Fragment>
                            
                        ))}
                    </tbody>
                </table>
            </div>
            
            {showModal1 &&(
                
                <ListaModal
                    changeModal={changeModal1}
                    product={selectedProduct}>
                </ListaModal>
            )}
      <div onClick={() =>setMostrarOrden(!mostrarOrden)}>
        <OrderMenu/>
        </div>
        {mostrarOrden &&(
            <OrderList changeModal={setMostrarOrden}/>
            
        )}
       
        </div>
    );
}

export default Lista;