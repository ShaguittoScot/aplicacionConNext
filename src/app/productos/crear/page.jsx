'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CrearProducto() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const router = useRouter();

    const manejarEnvio = async (e) => {
        e.preventDefault();
        
        try {
            // Convierte los datos  y envia al backend
            const productoData = {
                nombre,
                descripcion,
                cantidad: parseInt(cantidad, 10),
                precio: parseFloat(precio)
            };
            
            const respuesta = await axios.post("http://localhost:3000/nuevoProducto", productoData);
            
            if (respuesta.data) {
                alert("Producto agregado exitosamente");
                router.push("/productos/mostrar");
            } else {
                alert("Error al agregar el producto");
            }
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            alert("Error al agregar el producto");
        }
    };

    return (
        <div className="container">
            <h1>Agregar Nuevo Producto</h1>
            <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombre" 
                         autoComplete='off'
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input 
                        type="text" 
                        autoComplete='off'
                        className="form-control" 
                        id="descripcion" 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                    <input 
                        type="number" 
                        autoComplete='off'
                        className="form-control" 
                        id="cantidad" 
                        value={cantidad} 
                        onChange={(e) => setCantidad(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input 
                        type="number"
                        autoComplete='off' 
                        step="0.01" 
                        className="form-control" 
                        id="precio" 
                        value={precio} 
                        onChange={(e) => setPrecio(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar Producto</button>
            </form>
        </div>
    );
}
