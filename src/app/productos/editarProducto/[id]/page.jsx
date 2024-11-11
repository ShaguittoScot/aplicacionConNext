// EditarProducto.js
/*
'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarProducto() {
    const [producto, setProducto] = useState({ nombre: "", precio: "", cantidad: "", descripcion: "" });
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:3000/buscarProductoPorId/${id}`);
                setProducto(respuesta.data);
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            }
        };

        if (id) obtenerProducto();
    }, [id]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setProducto(prevProducto => ({ ...prevProducto, [name]: value }));
    };

    const guardarCambios = async () => {
        try {
            await axios.post(`http://localhost:3000/editarProducto/${id}`, producto);
            router.push("/productos/mostrar");
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    };

    return (
        <div className="container">
            <h1>Editar Producto</h1>
            <form>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={producto.nombre} 
                        onChange={manejarCambio} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label>Precio</label>
                    <input 
                        type="number" 
                        name="precio" 
                        value={producto.precio} 
                        onChange={manejarCambio} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label>Cantidad</label>
                    <input 
                        type="number" 
                        name="cantidad" 
                        value={producto.cantidad} 
                        onChange={manejarCambio} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label>Descripción</label>
                    <textarea 
                        name="descripcion" 
                        value={producto.descripcion} 
                        onChange={manejarCambio} 
                        className="form-control" 
                    />
                </div>
                <button type="button" onClick={guardarCambios} className="btn btn-success">
                    Guardar
                </button>
                <button type="button" onClick={() => router.push("/mostrarProductos")} className="btn btn-secondary ms-2">
                    Cancelar
                </button>
            </form>
        </div>
    );
}
*/

// EditarCompra.js
'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarCompra() {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [compra, setCompra] = useState({ idCliente: "", idProducto: "", cantidad: "" });
    const [clienteBusqueda, setClienteBusqueda] = useState("");
    const [productoBusqueda, setProductoBusqueda] = useState("");
    const router = useRouter();
    const { id } = useParams(); // ID de la compra a editar

    useEffect(() => {
        // Obtener clientes y productos
        const fetchDatos = async () => {
            try {
                const respuestaClientes = await axios.get("http://localhost:3000/clientes");
                setClientes(respuestaClientes.data);
                
                const respuestaProductos = await axios.get("http://localhost:3000/mostrarProductos");
                setProductos(respuestaProductos.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        // Obtener los datos de la compra a editar
        const obtenerCompra = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:3000/compras/${id}`);
                setCompra(respuesta.data);
                setClienteBusqueda(respuesta.data.clienteNombre); // Asumimos que el nombre del cliente está incluido
                setProductoBusqueda(respuesta.data.productoNombre); // Asumimos que el nombre del producto está incluido
            } catch (error) {
                console.error("Error al obtener la compra:", error);
            }
        };

        fetchDatos();
        if (id) obtenerCompra();
    }, [id]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setCompra(prevCompra => ({ ...prevCompra, [name]: value }));
    };

    const guardarCambios = async () => {
        try {
            await axios.post(`http://localhost:3000/editarCompra/${id}`, compra);
            router.push("/compras/mostrar");
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
        }
    };

    const clientesFiltrados = clienteBusqueda
        ? clientes.filter(cliente => cliente.nombre.toLowerCase().includes(clienteBusqueda.toLowerCase()))
        : [];

    const productosFiltrados = productoBusqueda
        ? productos.filter(producto => producto.nombre.toLowerCase().includes(productoBusqueda.toLowerCase()))
        : [];

    return (
        <div className="container">
            <h1>Editar Compra</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="clienteBusqueda" className="form-label">Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        id="clienteBusqueda"
                        placeholder="Escribe para buscar cliente"
                        value={clienteBusqueda}
                        onChange={(e) => setClienteBusqueda(e.target.value)}
                        required
                    />
                    {clienteBusqueda && (
                        <ul className="list-group">
                            {clientesFiltrados.map(cliente => (
                                <li
                                    key={cliente.id}
                                    className="list-group-item"
                                    onClick={() => {
                                        setCompra(prevCompra => ({ ...prevCompra, idCliente: cliente.id }));
                                        setClienteBusqueda(cliente.nombre);
                                    }}
                                >
                                    {cliente.nombre}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="productoBusqueda" className="form-label">Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productoBusqueda"
                        placeholder="Escribe para buscar producto"
                        value={productoBusqueda}
                        onChange={(e) => setProductoBusqueda(e.target.value)}
                        required
                    />
                    {productoBusqueda && (
                        <ul className="list-group">
                            {productosFiltrados.map(producto => (
                                <li
                                    key={producto.id}
                                    className="list-group-item"
                                    onClick={() => {
                                        setCompra(prevCompra => ({ ...prevCompra, idProducto: producto.id }));
                                        setProductoBusqueda(producto.nombre);
                                    }}
                                >
                                    {producto.nombre}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cantidad"
                        name="cantidad"
                        value={compra.cantidad}
                        onChange={manejarCambio}
                        required
                        min="1"
                    />
                </div>
                <button type="button" onClick={guardarCambios} className="btn btn-success">
                    Guardar
                </button>
                <button type="button" onClick={() => router.push("/compras/mostrar")} className="btn btn-secondary ms-2">
                    Cancelar
                </button>
            </form>
        </div>
    );
}
