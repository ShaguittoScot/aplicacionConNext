/*
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CrearCompra() {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [idCliente, setIdCliente] = useState('');
    const [idProducto, setIdProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Obtener la lista de clientes desde el backend
        const fetchClientes = async () => {
            try {
                const respuesta = await axios.get("http://localhost:3000/");
                setClientes(respuesta.data);
            } catch (error) {
                console.error("Error al obtener clientes:", error);
            }
        };

        // Obtener la lista de productos desde el backend
        const fetchProductos = async () => {
            try {
                const respuesta = await axios.get("http://localhost:3000/mostrarProductos");
                setProductos(respuesta.data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchClientes();
        fetchProductos();
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

    return (
        <div className="container">
            <h1>Registrar Nueva Compra</h1>
            <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                    <label htmlFor="idCliente" className="form-label">Cliente</label>
                    <select
                        className="form-select"
                        id="idCliente"
                        value={idCliente}
                        onChange={(e) => setIdCliente(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nombre} 
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="idProducto" className="form-label">Producto</label>
                    <select
                        className="form-select"
                        id="idProducto"
                        value={idProducto}
                        onChange={(e) => setIdProducto(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un producto</option>
                        {productos.map(producto => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre} 
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="cantidad" 
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

*/


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
        // Obtener clientes y productos desde el backend
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

   /* 
   // Filtrar clientes y productos según la búsqueda
    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(clienteBusqueda.toLowerCase())
    );

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(productoBusqueda.toLowerCase())
    );
    */

    // Filtrar clientes y productos solo si hay texto en los campos de búsqueda
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
                                    setIdCliente(cliente.id);
                                    setClienteBusqueda(cliente.nombre); // Mostrar el nombre en el campo de búsqueda
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
                                    setIdProducto(producto.id);
                                    setProductoBusqueda(producto.nombre); // Mostrar el nombre en el campo de búsqueda
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
