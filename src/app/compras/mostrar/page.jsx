'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Componente que muestra la lista de compras
export default function ListaCompras() {
    const [compras, setCompras] = useState([]); // Estado para almacenar las compras
    const [compraSeleccionada, setCompraSeleccionada] = useState(null); // Estado para la compra seleccionada
    const router = useRouter();

    useEffect(() => {
        const fetchCompras = async () => {
            const url = "http://localhost:3000/mostrarCompras";
            try {
                const response = await axios.get(url);
                setCompras(response.data); // Actualiza el estado con las compras obtenidas
            } catch (error) {
                alert("Error al obtener compras."); // Mensaje de error si falla
            }
        };

        fetchCompras(); // llama a la funcion para obtener compras
    }, []);

    const mostrarDetalles = (compra) => {
        if (compraSeleccionada && compraSeleccionada.IdVenta === compra.IdVenta) {
            setCompraSeleccionada(null);
        } else {
            setCompraSeleccionada(compra); // Seleccionar la nueva compra
        }
    };

    const redirigirAgregarProducto = () => {
        router.push('/compras/nueva'); // Redirige a la pagina para un nuevo producto
    };

    const cambiarEstadoCompra = async (idVenta, nuevoEstado) => {
        try {
            await axios.patch(`http://localhost:3000/actualizarEstadoCompra/${idVenta}/${nuevoEstado}`);
            // Actualiza la lista de compras despues de cambiar el estado
            const response = await axios.get("http://localhost:3000/mostrarCompras");
            setCompras(response.data);
            alert(`Estado de la compra actualizado a '${nuevoEstado}'`);
        } catch (error) {
            alert("No se pudo cambiar el estado de la compra."); // Mensaje de error si falla
        }
    };

    const redirigirEditarCompra = (idVenta) => {
        router.push(`/compras/editar/${idVenta}`); // Redirige a la pagina de edicion de la compra con el ID
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
                            <td> {compra.estado === "activa" && (
                                <span className="text-primary">Activa</span> // Azul
                            )}
                                {compra.estado === "completada" && (
                                    <span className="text-success">Completada</span> // Verde
                                )}
                                {compra.estado === "cancelada" && (
                                    <span className="text-danger">Cancelada</span> // Rojo
                                )}</td>
                            <td>
                                <button onClick={() => cambiarEstadoCompra(compra.IdVenta, "completada")} className="btn btn-success btn-sm">
                                    Completar
                                </button>
                                <button onClick={() => cambiarEstadoCompra(compra.IdVenta, "cancelada")} className="btn btn-danger btn-sm">
                                    Cancelar
                                </button>

                                {/* {compra.estado === "activa" && (
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
                                */}

                                <button onClick={() => redirigirEditarCompra(compra.IdVenta)} className="btn btn-warning btn-sm ms-2">
                                    Editar
                                </button>
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

