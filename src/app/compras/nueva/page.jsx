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
                const respuesta = await axios.get("http://localhost:3000/"); // Asegúrate de que esta sea la ruta correcta para clientes
                setClientes(respuesta.data);
            } catch (error) {
                console.error("Error al obtener clientes:", error);
            }
        };

        // Obtener la lista de productos desde el backend
        const fetchProductos = async () => {
            try {
                const respuesta = await axios.get("http://localhost:3000/mostrarProductos"); // Ruta correcta para productos
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
                cantidad: parseInt(cantidad, 10), // Asegúrate de que 'cantidad' sea un número
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
                                {cliente.nombre} {/* Asegúrate de que 'nombre' es la propiedad correcta */}
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
                                {producto.nombre} {/* Asegúrate de que 'nombre' es la propiedad correcta */}
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

