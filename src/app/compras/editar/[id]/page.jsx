'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarCompra() {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [idCliente, setIdCliente] = useState('');
    const [idProducto, setIdProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [cargando, setCargando] = useState(false);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const respuesta = await axios.get("http://localhost:3000/");
                setClientes(respuesta.data);
            } catch (error) {
                console.error("Error al obtener clientes:", error);
            }
        };

        const fetchProductos = async () => {
            try {
                const respuesta = await axios.get("http://localhost:3000/mostrarProductos");
                setProductos(respuesta.data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        const fetchCompra = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:3000/buscarCompraPorId/${id}`);
                console.log("Compra obtenida:", respuesta.data); // Para verificar la compra obtenida
                setIdCliente(respuesta.data.idCliente.toString());  // Establecer idCliente
                setIdProducto(respuesta.data.idProducto.toString()); // Establecer idProducto
                setCantidad(respuesta.data.cantidad);
            } catch (error) {
                console.error("Error al obtener la compra:", error);
            }
        };

        fetchClientes();
        fetchProductos();
        if (id) fetchCompra();
    }, [id]);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            const compraData = {
                idCliente,
                idProducto,
                cantidad: parseInt(cantidad, 10),
            };
            const respuesta = await axios.put(`http://localhost:3000/editarCompra/${id}`, compraData);
            if (respuesta.data) {
                alert("Compra actualizada exitosamente");
                router.push("/compras/mostrar");
            } else {
                alert("Error al actualizar la compra");
            }
        } catch (error) {
            console.error("Error al actualizar la compra:", error);
            alert(`Error al actualizar la compra: ${error.response ? error.response.data.mensaje : error.message}`);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="container">
            <h1>Editar Compra</h1>
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
                <button type="submit" className="btn btn-primary" disabled={cargando}>
                    {cargando ? "Actualizando..." : "Actualizar Compra"}
                </button>
            </form>
        </div>
    );
}
