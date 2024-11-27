'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ListaCompras() {
    const [compras, setCompras] = useState([]); 
    const [compraSeleccionada, setCompraSeleccionada] = useState(null); 
    const [mostrarCanceladas, setMostrarCanceladas] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        const fetchCompras = async () => {
            const url = "http://localhost:3000/mostrarCompras";
            try {
                const response = await axios.get(url);
                setCompras(response.data);
            } catch (error) {
                alert("Error al obtener compras.");
            }
        };

        fetchCompras();
    }, []);

    const mostrarDetalles = (compra) => {
        setCompraSeleccionada(
            compraSeleccionada && compraSeleccionada.IdVenta === compra.IdVenta
                ? null
                : compra
        );
    };

    const redirigirAgregarProducto = () => {
        router.push('/compras/nueva');
    };

    const cambiarEstadoCompra = async (idVenta, nuevoEstado) => {
        try {
            await axios.patch(`http://localhost:3000/actualizarEstadoCompra/${idVenta}/${nuevoEstado}`);
            const response = await axios.get("http://localhost:3000/mostrarCompras");
            setCompras(response.data);
            alert(`Estado de la compra actualizado a '${nuevoEstado}'`);
        } catch (error) {
            alert("No se pudo cambiar el estado de la compra.");
        }
    };

    const redirigirEditarCompra = (idVenta) => {
        router.push(`/compras/editar/${idVenta}`);
    };

    const comprasFiltradas = compras
        .filter(compra => mostrarCanceladas || compra.estado !== "cancelada")
        .sort((a, b) => {
            const dateA = new Date(`${a.fecha}T${a.hora}`);
            const dateB = new Date(`${b.fecha}T${b.hora}`);
            return dateB - dateA;
        });

    return (
        <div className="container">
            <h1>Lista de Compras</h1>
            <button onClick={redirigirAgregarProducto} className="btn btn-primary mb-3">
                Agregar nueva Compra
            </button>
            <button
                onClick={() => setMostrarCanceladas(!mostrarCanceladas)}
                className="btn btn-secondary mb-3 ms-2"
            >
                {mostrarCanceladas ? "Ocultar Canceladas" : "Mostrar Canceladas"}
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
                    {comprasFiltradas.map((compra, index) => (
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
                            <td>
                                {compra.estado === "activa" && (
                                    <span className="text-primary">Activa</span>
                                )}
                                {compra.estado === "completada" && (
                                    <span className="text-success">Completada</span>
                                )}
                                {compra.estado === "cancelada" && (
                                    <span className="text-danger">Cancelada</span>
                                )}
                            </td>
                            <td>
                                <button onClick={() => cambiarEstadoCompra(compra.IdVenta, "completada")} className="btn btn-success btn-sm">
                                    Completar
                                </button>
                                <button onClick={() => cambiarEstadoCompra(compra.IdVenta, "cancelada")} className="btn btn-danger btn-sm">
                                    Cancelar
                                </button>
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
