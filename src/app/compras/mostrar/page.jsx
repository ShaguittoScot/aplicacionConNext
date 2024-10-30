/*'use client';

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


// Componente que muestra la lista de compras
export default function ListaCompras() {
    const [compras, setCompras] = useState([]); // Estado para almacenar las compras
    const [compraSeleccionada, setCompraSeleccionada] = useState(null); // Estado para la compra seleccionada
    const router = useRouter(); // Inicializar router

    useEffect(() => {
        const fetchCompras = async () => {
            const url = "http://localhost:3000/mostrarCompras";
            try {
                const response = await axios.get(url);
                setCompras(response.data); // Actualiza el estado con las compras obtenidas
            } catch (error) {
                console.error("Error al obtener compras:", error);
            }
        };

        fetchCompras(); // Llama a la función para obtener compras
    }, []);

    const mostrarDetalles = (compra) => {
        if (compraSeleccionada && compraSeleccionada.idVenta === compra.idVenta) {
            setCompraSeleccionada(null); // Cerrar detalles si la compra ya está seleccionada
        } else {
            setCompraSeleccionada(compra); // Seleccionar la nueva compra
        }
    };

    const redirigirAgregarProducto = () => {
        router.push('/compras/nueva'); // Redirige a la página para crear un nuevo producto
    };

    const cambiarEstadoCompra = async (idVenta, nuevoEstado) => {
        console.log(`Buscando compra ID: ${idVenta}`); // Verifica el ID
        try {
            const response = await axios.patch(`http://localhost:3000/actualizarEstadoCompra/${idVenta}/${nuevoEstado}`);
            // Aquí puedes actualizar el estado de la lista de compras si es necesario
            setCompras((prevCompras) => prevCompras.map(compra => 
                compra.idVenta === idVenta ? { ...compra, estado: nuevoEstado } : compra
            ));
            alert(`Estado de la compra actualizado a '${nuevoEstado}'`);
        } catch (error) {
            console.error("Error al cambiar el estado de la compra:", error);
            alert("No se pudo cambiar el estado de la compra.");
        }
    };
    

    return (
        <div className="container">
            <h1>Lista de Compras</h1>
            <button onClick={redirigirAgregarProducto} className="btn btn-primary mb-3">
                Agregar nueva Compra
            </button>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((compra, index) => (
                        <tr key={compra.IdVenta}>
                            <td>{index + 1}</td>
                            <td>
                                <a
                                    href="#!"
                                    onClick={() => mostrarDetalles(compra)}
                                    className="text-primary"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {compra.Cliente}
                                </a>
                            </td>
                            <td>{compra.Producto}</td>
                            <td>{compra.cantidad}</td>
                            <td>{compra.fecha}</td>
                            <td>{compra.hora}</td>
                            <td>{compra.estado}</td>
                            <td>
                                {compra.estado === "activa" && (
                                    <>
                                        <button onClick={() => cambiarEstadoCompra(compra.IdVenta, "completada")} className="btn btn-success btn-sm">
                                            Completar
                                        </button>
                                        <button onClick={() => cambiarEstadoCompra(compra.IdVenta, "cancelada")} className="btn btn-danger btn-sm">
                                            Cancelar
                                        </button>
                                    </>
                                )}
                                {compra.estado === "completada" && (
                                    <span className="text-success">Completada</span>
                                )}
                                {compra.estado === "cancelada" && (
                                    <span className="text-danger">Cancelada</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {compraSeleccionada && (
                <div className="mt-4">
                    <h2>Detalles de la Compra</h2>
                    <p><strong>ID Venta:</strong> {compraSeleccionada.IdVenta}</p>
                    <p><strong>Cliente:</strong> {compraSeleccionada.Cliente}</p>
                    <p><strong>Producto:</strong> {compraSeleccionada.Producto}</p>
                    <p><strong>Cantidad:</strong> {compraSeleccionada.cantidad}</p>
                    <p><strong>Fecha:</strong> {compraSeleccionada.fecha}</p>
                    <p><strong>Hora:</strong> {compraSeleccionada.hora}</p>
                    <p><strong>Estado:</strong> {compraSeleccionada.estado}</p>
                </div>
            )}
        </div>
    );
}
*/

'use client';

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Componente que muestra la lista de compras
export default function ListaCompras() {
    const [compras, setCompras] = useState([]); // Estado para almacenar las compras
    const [compraSeleccionada, setCompraSeleccionada] = useState(null); // Estado para la compra seleccionada
    const router = useRouter(); // Inicializar router

    useEffect(() => {
        const fetchCompras = async () => {
            const url = "http://localhost:3000/mostrarCompras";
            try {
                const response = await axios.get(url);
                setCompras(response.data); // Actualiza el estado con las compras obtenidas
            } catch (error) {
                alert("Error al obtener compras."); // Mensaje de error si falla la obtención
            }
        };

        fetchCompras(); // Llama a la función para obtener compras
    }, []);

    const mostrarDetalles = (compra) => {
        if (compraSeleccionada && compraSeleccionada.IdVenta === compra.IdVenta) {
            setCompraSeleccionada(null); // Cerrar detalles si la compra ya está seleccionada
        } else {
            setCompraSeleccionada(compra); // Seleccionar la nueva compra
        }
    };

    const redirigirAgregarProducto = () => {
        router.push('/compras/nueva'); // Redirige a la página para crear un nuevo producto
    };

    const cambiarEstadoCompra = async (idVenta, nuevoEstado) => {
        try {
            await axios.patch(`http://localhost:3000/actualizarEstadoCompra/${idVenta}/${nuevoEstado}`);
            // Actualiza la lista de compras después de cambiar el estado
            const response = await axios.get("http://localhost:3000/mostrarCompras");
            setCompras(response.data);
            alert(`Estado de la compra actualizado a '${nuevoEstado}'`);
        } catch (error) {
            alert("No se pudo cambiar el estado de la compra."); // Mensaje de error si falla la actualización
        }
    };

    return (
        <div className="container">
            <h1>Lista de Compras</h1>
            <button onClick={redirigirAgregarProducto} className="btn btn-primary mb-3">
                Agregar nueva Compra
            </button>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((compra, index) => (
                        <tr key={compra.IdVenta}>
                            <td>{index + 1}</td>
                            <td>
                                <a
                                    href="#!"
                                    onClick={() => mostrarDetalles(compra)}
                                    className="text-primary"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {compra.Cliente}
                                </a>
                            </td>
                            <td>{compra.Producto}</td>
                            <td>{compra.cantidad}</td>
                            <td>{compra.fecha}</td>
                            <td>{compra.hora}</td>
                            <td>{compra.estado}</td>
                            <td>
                                {compra.estado === "activa" && (
                                    <>
                                        <button onClick={() => cambiarEstadoCompra(compra.IdVenta, "completada")} className="btn btn-success btn-sm">
                                            Completar
                                        </button>
                                        <button onClick={() => cambiarEstadoCompra(compra.IdVenta, "cancelada")} className="btn btn-danger btn-sm">
                                            Cancelar
                                        </button>
                                    </>
                                )}
                                {compra.estado === "completada" && (
                                    <span className="text-success">Completada</span>
                                )}
                                {compra.estado === "cancelada" && (
                                    <span className="text-danger">Cancelada</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {compraSeleccionada && (
                <div className="mt-4">
                    <h2>Detalles de la Compra</h2>
                    <p><strong>ID Venta:</strong> {compraSeleccionada.IdVenta}</p>
                    <p><strong>Cliente:</strong> {compraSeleccionada.Cliente}</p>
                    <p><strong>Producto:</strong> {compraSeleccionada.Producto}</p>
                    <p><strong>Cantidad:</strong> {compraSeleccionada.cantidad}</p>
                    <p><strong>Fecha:</strong> {compraSeleccionada.fecha}</p>
                    <p><strong>Hora:</strong> {compraSeleccionada.hora}</p>
                    <p><strong>Estado:</strong> {compraSeleccionada.estado}</p>
                </div>
            )}
        </div>
    );
}
