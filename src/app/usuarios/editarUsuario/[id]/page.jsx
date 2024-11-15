'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarUsuario() {
    const [usuario, setUsuario] = useState({
        nombre: '',
        usuario: '',
        password: '', // Deja el campo vacío
    });
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:3000/buscarUsuarioPorId/${id}`);
                const { password, ...dataSinPassword } = respuesta.data; // Excluye la contraseña
                setUsuario(dataSinPassword);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };

        if (id) obtenerUsuario();
    }, [id]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setUsuario(prevUsuario => ({ ...prevUsuario, [name]: value }));
    };

    const guardarCambios = async () => {
        try {
            const url = `http://localhost:3000/editarUsuario/${id}`;
            const { password, ...usuarioActualizado } = usuario;
            
            // Solo incluir la contraseña si el usuario ingresó una nueva
            if (password) {
                usuarioActualizado.password = password;
            }

            await axios.put(url, usuarioActualizado);
            alert("Usuario actualizado con éxito");
            router.push("/usuarios/mostrar");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            alert("Hubo un error al actualizar el usuario");
        }
    };

    return (
        <div className="container">
            <h1>Editar Usuario</h1>
            <form>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        autoComplete="off"
                        value={usuario.nombre} 
                        onChange={manejarCambio} 
                        className="form-control" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Usuario</label>
                    <input 
                        type="text" 
                        name="usuario"
                        autoComplete="off" 
                        value={usuario.usuario} 
                        onChange={manejarCambio} 
                        className="form-control" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Nueva Password (dejar en blanco si no se desea cambiar)</label>
                    <input 
                        type="password" 
                        name="password" 
                        autoComplete="off"
                        value={usuario.password} 
                        onChange={manejarCambio} 
                        className="form-control" 
                        placeholder="Nueva contraseña"
                    />
                </div>
                <button type="button" onClick={guardarCambios} className="btn btn-success">
                    Actualizar usuario
                </button>
                <button type="button" onClick={() => router.push("/usuarios/mostrar")} className="btn btn-secondary ms-2">
                    Cancelar
                </button>
            </form>
        </div>
    );
}

