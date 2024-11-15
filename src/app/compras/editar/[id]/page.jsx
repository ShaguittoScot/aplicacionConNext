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
    const [mostrarClientes, setMostrarClientes] = useState(false);
    const [mostrarProductos, setMostrarProductos] = useState(false);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const [respuestaClientes, respuestaProductos, respuestaCompra] = await Promise.all([
                    axios.get("http://localhost:3000/"),
                    axios.get("http://localhost:3000/mostrarProductos"),
                    axios.get(`http://localhost:3000/buscarCompraPorId/${id}`)
                ]);
                
                setClientes(respuestaClientes.data);
                setProductos(respuestaProductos.data);
                
                if (respuestaCompra.data && respuestaCompra.data.length > 0) {
                    const datosCompra = respuestaCompra.data[0];
                    setCompra({
                        idCliente: datosCompra.idCliente,
                        idProducto: datosCompra.idProducto,
                        cantidad: datosCompra.cantidad
                    });
                    
                    const clienteEncontrado = respuestaClientes.data.find(cliente => cliente.id === datosCompra.idCliente);
                    const productoEncontrado = respuestaProductos.data.find(producto => producto.id === datosCompra.idProducto);
                    
                    setClienteBusqueda(clienteEncontrado ? clienteEncontrado.nombre : "");
                    setProductoBusqueda(productoEncontrado ? productoEncontrado.nombre : "");
                }
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchDatos();
    }, [id]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setCompra(prevCompra => ({ ...prevCompra, [name]: value }));
    };

    const guardarCambios = async () => {
        try {
            await axios.put(`http://localhost:3000/editarCompra/${id}`, compra);
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
                        onChange={(e) => {
                            setClienteBusqueda(e.target.value);
                            setMostrarClientes(true); // Mostrar lista cuando el usuario empieza a escribir
                        }}
                        required
                    />
                    {mostrarClientes && clienteBusqueda && (
                        <ul className="list-group">
                            {clientesFiltrados.map(cliente => (
                                <li
                                    key={cliente.id}
                                    className="list-group-item"
                                    onClick={() => {
                                        setCompra(prevCompra => ({ ...prevCompra, idCliente: cliente.id }));
                                        setClienteBusqueda(cliente.nombre); // Mostrar el nombre en la UI
                                        setMostrarClientes(false); // Ocultar lista después de seleccionar
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
                        onChange={(e) => {
                            setProductoBusqueda(e.target.value);
                            setMostrarProductos(true); // Mostrar lista cuando el usuario empieza a escribir
                        }}
                        required
                    />
                    {mostrarProductos && productoBusqueda && (
                        <ul className="list-group">
                            {productosFiltrados.map(producto => (
                                <li
                                    key={producto.id}
                                    className="list-group-item"
                                    onClick={() => {
                                        setCompra(prevCompra => ({ ...prevCompra, idProducto: producto.id }));
                                        setProductoBusqueda(producto.nombre); // Mostrar el nombre en la UI
                                        setMostrarProductos(false); // Ocultar lista después de seleccionar
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
