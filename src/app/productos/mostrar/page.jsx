'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter

export default function MostrarProductos() {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const router = useRouter(); // Inicializar router

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await axios.get("http://localhost:3000/mostrarProductos");
                setProductos(respuesta.data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };

        obtenerProductos();
    }, []);

    const mostrarDetalles = (producto) => {
        if (productoSeleccionado && productoSeleccionado.id === producto.id) {
            setProductoSeleccionado(null);
        } else {
            setProductoSeleccionado(producto);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await axios.get(`http://localhost:3000/borrarProducto/${id}`);
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    const redirigirEditarProducto = (id) => {
        router.push(`/productos/editarProducto/${id}`);
    };

    const redirigirAgregarProducto = () => {
        router.push('/productos/crear'); // Redirige a la página para crear un nuevo producto
    };

    return (
        <div className="container">
            <h1>Lista de Productos</h1>
            <button onClick={redirigirAgregarProducto} className="btn btn-primary mb-3">
                Agregar Producto
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre del Producto</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>
                                <a 
                                    href="#!" 
                                    onClick={() => mostrarDetalles(producto)} 
                                    className="text-primary" 
                                    style={{ cursor: 'pointer' }}
                                >
                                    {producto.nombre}
                                </a>
                            </td>
                            <td>${producto.precio}</td>
                            <td>
                                <button onClick={() => redirigirEditarProducto(producto.id)} className="btn btn-warning btn-sm">
                                    Editar
                                </button>
                                <button onClick={() => eliminarProducto(producto.id)} className="btn btn-danger btn-sm ms-2">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {productoSeleccionado && (
                <div className="mt-4">
                    <h2>Detalles del Producto</h2>
                    <p><strong>Descripción:</strong> {productoSeleccionado.descripcion}</p>
                    <p><strong>Cantidad disponible:</strong> {productoSeleccionado.cantidad}</p>
                    <p><strong>Precio:</strong> {productoSeleccionado.precio}</p>
                </div>
            )}
        </div>
    );
}
