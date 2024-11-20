'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CrearCompra() {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [idCliente, setIdCliente] = useState('');
    const [idProducto, setIdProducto] = useState('');
    const [clienteBusqueda, setClienteBusqueda] = useState('');
    const [productoBusqueda, setProductoBusqueda] = useState('');
    const [cantidad, setCantidad] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const respuestaClientes = await axios.get("http://localhost:3000/");
                setClientes(respuestaClientes.data);

                const respuestaProductos = await axios.get("http://localhost:3000/mostrarProductos");
                setProductos(respuestaProductos.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchDatos();
    }, []);

    const manejarEnvio = async (e) => {
        e.preventDefault();

        try {
            const compraData = {
                idCliente,
                idProducto,
                cantidad: parseInt(cantidad, 10),
            };

            const respuesta = await axios.post("http://localhost:3000/nuevaCompra", compraData);

            if (respuesta.data) {
                alert("Compra registrada exitosamente");
                router.push("/compras/mostrar");
            } else {
                alert("Error al registrar la compra");
            }
        } catch (error) {
            console.error("Error al registrar la compra:", error);
            alert("Error al registrar la compra");
        }
    };

    const clientesFiltrados = clienteBusqueda
        ? clientes.filter(cliente =>
            cliente.nombre.toLowerCase().includes(clienteBusqueda.toLowerCase())
        )
        : [];

    const productosFiltrados = productoBusqueda
        ? productos.filter(producto =>
            producto.nombre.toLowerCase().includes(productoBusqueda.toLowerCase())
        )
        : [];

    return (
        <div className="container">
            <h1>Registrar Nueva Compra</h1>
            <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                    <label htmlFor="clienteBusqueda" className="form-label">Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        autoComplete='off'
                        id="clienteBusqueda"
                        placeholder="Escribe para buscar cliente"
                        value={clienteBusqueda}
                        onChange={(e) => setClienteBusqueda(e.target.value)}
                        required
                    />
                    <ul className="list-group">
                        {clientesFiltrados.map(cliente => (
                            <li
                                key={cliente.id}
                                className="list-group-item"
                                onClick={() => {
                                    setIdCliente(cliente.id); // Guardar el ID del cliente seleccionado
                                    setClienteBusqueda(cliente.nombre); // Completar el campo de texto
                                    setClientes([]); // Ocultar la lista
                                }}
                            >
                                {cliente.nombre}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-3">
                    <label htmlFor="productoBusqueda" className="form-label">Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productoBusqueda"
                        autoComplete='off'
                        placeholder="Escribe para buscar producto"
                        value={productoBusqueda}
                        onChange={(e) => setProductoBusqueda(e.target.value)}
                        required
                    />
                    <ul className="list-group">
                        {productosFiltrados.map(producto => (
                            <li
                                key={producto.id}
                                className="list-group-item"
                                onClick={() => {
                                    setIdProducto(producto.id); // Guardar el ID del producto seleccionado
                                    setProductoBusqueda(producto.nombre); // Completar el campo de texto
                                    setProductos([]); // Ocultar la lista
                                }}
                            >
                                {producto.nombre}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cantidad"
                        autoComplete='off'
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                        min="1"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrar Compra</button>
            </form>
        </div>
    );
}
