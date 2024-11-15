'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarProducto() {
    const [producto, setProducto] = useState({ nombre: "", precio: "", cantidad: "", descripcion: "" });
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:3000/buscarProductoPorId/${id}`);
                setProducto(respuesta.data);
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            }
        };

        if (id) obtenerProducto();
    }, [id]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setProducto(prevProducto => ({ ...prevProducto, [name]: value }));
    };

    const guardarCambios = async () => {
        try {
            await axios.post(`http://localhost:3000/editarProducto/${id}`, producto);
            router.push("/productos/mostrar");
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    };

    return (
        <div className="container">
            <h1>Editar Producto</h1>
            <form>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        autoComplete="off"
                        value={producto.nombre} 
                        onChange={manejarCambio} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label>Precio</label>
                    <input 
                        type="number" 
                        name="precio" 
                        autoComplete="off"
                        value={producto.precio} 
                        onChange={manejarCambio} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label>Cantidad</label>
                    <input 
                        type="number" 
                        name="cantidad" 
                        autoComplete="off"
                        value={producto.cantidad} 
                        onChange={manejarCambio} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label>Descripción</label>
                    <textarea 
                        name="descripcion" 
                        value={producto.descripcion} 
                        onChange={manejarCambio} 
                        className="form-control" 
                    />
                </div>
                <button type="button" onClick={guardarCambios} className="btn btn-success">
                    Guardar
                </button>
                <button type="button" onClick={() => router.push("/productos/mostrar")} className="btn btn-secondary ms-2">
                    Cancelar
                </button>
            </form>
        </div>
    );
}