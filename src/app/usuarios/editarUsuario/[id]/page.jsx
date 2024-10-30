/*'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Asumiendo que estás usando Next.js

export default function EditarUsuario({ idUsuario }) { // Se pasa el id del usuario a editar
    const [usuario, setUsuario] = useState({
        nombre: '',
        usuario: '',
        password: ''
    });
    const router = useRouter();

    // Obtener los datos del usuario cuando se monta el componente
    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:3000/usuarios/${idUsuario}`);
                setUsuario(respuesta.data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };
        obtenerUsuario();
    }, [idUsuario]);

    const editarUsuario = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:3000/editarUsuario/${idUsuario}`;
            await axios.put(url, usuario);
            alert("Usuario actualizado con éxito");
            router.push("/usuarios"); // Redirigir después de la actualización
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            alert("Hubo un error al actualizar el usuario");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({
            ...usuario,
            [name]: value
        });
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={editarUsuario} action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Usuario</h1>
                    </div>
                    <div className="card-body">
                        <input 
                            id="nombre" 
                            name="nombre" 
                            placeholder="Nombre" 
                            autoFocus 
                            className="form-control mb-3" 
                            type="text" 
                            value={usuario.nombre} 
                            onChange={handleChange}
                            required 
                        />
                        <input 
                            id="usuario" 
                            name="usuario" 
                            placeholder="Usuario" 
                            className="form-control mb-3" 
                            type="text" 
                            value={usuario.usuario} 
                            onChange={handleChange}
                            required 
                        />
                        <input 
                            id="password" 
                            name="password" 
                            placeholder="Password" 
                            className="form-control mb-3" 
                            type="password" 
                            value={usuario.password} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success col-12 mt-3 mb-3" type="submit">Actualizar usuario</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
*/

'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarUsuario() {
    const [usuario, setUsuario] = useState({
        nombre: '',
        usuario: '',
        password: '', // Para manejar la contraseña
    });
    const router = useRouter();
    const { id } = useParams(); // Obtiene el ID directamente desde la URL

    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:3000/buscarUsuarioPorId/${id}`);
                setUsuario(respuesta.data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };

        if (id) obtenerUsuario(); // Asegúrate de que el ID esté definido
    }, [id]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setUsuario(prevUsuario => ({ ...prevUsuario, [name]: value }));
    };

    const guardarCambios = async () => {
        try {
            const url = `http://localhost:3000/editarUsuario/${id}`;
            // Excluir la contraseña si está vacía
            const { password, ...usuarioActualizado } = usuario;
            if (password) {
                usuarioActualizado.password = password; // Incluir la contraseña solo si no está vacía
            }
            await axios.put(url, usuarioActualizado);
            alert("Usuario actualizado con éxito");
            router.push("/usuarios");
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
                        value=""
                        onChange={manejarCambio} 
                        className="form-control" 
                    />
                </div>
                <button type="button" onClick={guardarCambios} className="btn btn-success">
                    Actualizar usuario
                </button>
                <button type="button" onClick={() => router.push("/usuarios")} className="btn btn-secondary ms-2">
                    Cancelar
                </button>
            </form>
        </div>
    );
}


