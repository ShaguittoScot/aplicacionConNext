'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CrearUsuario() {
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const manejarEnvio = async (e) => {
        e.preventDefault();
        
        try {
            const usuarioData = {
                nombre,
                usuario,
                password
            };
            
            const respuesta = await axios.post("http://localhost:3000/nuevoUsuario", usuarioData);
            
            if (respuesta.data) {
                alert("Usuario creado exitosamente");
                router.push("/usuarios/mostrar"); // Redirige a la página de usuarios
            } else {
                alert("Error al crear el usuario");
            }
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            alert("Error al crear el usuario");
        }
    };

    return (
        <div className="container">
            <h1>Agregar Nuevo Usuario</h1>
            <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        autoComplete='off'
                        className="form-control" 
                        id="nombre" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="usuario" className="form-label">Usuario</label>
                    <input 
                        type="text" 
                        autoComplete='off'
                        className="form-control" 
                        id="usuario" 
                        value={usuario} 
                        onChange={(e) => setUsuario(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        autoComplete='off'
                        className="form-control" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Usuario</button>
            </form>
        </div>
    );
}

