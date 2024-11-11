/*
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
*/

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
