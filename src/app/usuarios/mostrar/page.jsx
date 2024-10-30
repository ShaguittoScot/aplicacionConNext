/*import axios from "axios";
import './UsuariosPage.css';
import BorrarUsuario from "@/componentes/borrar";
// Función para obtener usuarios de una API local
async function fetchUsuarios() {
    const url = "http://localhost:3000"; // Asegúrate de que la URL sea correcta
    const usuarios = await axios.get(url);
    return usuarios.data;
}

// Componente que muestra los usuarios
export default async function UsuariosPage() {
    const usuarios = await fetchUsuarios(); // Llamamos a la función fetchUsuarios

    return (
        <>
            <h1>Usuarios</h1>
            <table className="Tabla">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, i) => (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.nombre}</td>
                            <td><BorrarUsuario id = {usuario.id}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
*/

/* import axios from "axios";
import './UsuariosPage.css';
import BorrarUsuario from "@/componentes/borrar";

// Función para obtener usuarios de una API local
async function fetchUsuarios() {
    const url = "http://localhost:3000"; // Asegúrate de que la URL sea correcta
    try {
        const usuarios = await axios.get(url);
        return usuarios.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return []; // Retornamos un array vacío en caso de error
    }
}

// Componente que muestra los usuarios
export default async function UsuariosPage() {
    const usuarios = await fetchUsuarios(); // Llamamos a la función fetchUsuarios

    return (
        <>
            <h1>Usuarios</h1>
            <table className="Tabla">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td> 
                            <td><BorrarUsuario id={usuario.id} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
 *//*
'use client';

import axios from "axios";
import BorrarUsuario from "@/componentes/borrar";
import Link from 'next/link'; // Importa el componente de enlace
import { useEffect, useState } from "react"; // Importa useEffect y useState

// Componente que muestra los usuarios
export default function UsuariosPage() {
   const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios

   useEffect(() => {
       const fetchUsuarios = async () => {
           const url = "http://localhost:3000/"; // Asegúrate de que la URL sea correcta
           try {
               const response = await axios.get(url);
               setUsuarios(response.data); // Actualiza el estado con los usuarios obtenidos
           } catch (error) {
               console.error("Error fetching users:", error);
           }
       };

       fetchUsuarios(); // Llama a la función para obtener usuarios
   }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

   return (
       <div className="container">
           <h1>Lista de Usuarios</h1>
           <table className="table">
               <thead>
                   <tr>
                       <th>ID</th>
                       <th>Nombre</th>
                       <th>Acciones</th> 
                   </tr>
               </thead>
               <tbody>
                   {usuarios.map((usuario, index) => (
                       <tr key={usuario.id}>
                           <td>{index + 1}</td>
                           
                           <td>
                               <Link href={`/usuarios/editarUsuario/${usuario.id}`}>
                                   {usuario.nombre}
                               </Link>
                           </td>
                           <td>
                               <BorrarUsuario id={usuario.id} /> 
                           </td>
                       </tr>
                   ))}
               </tbody>
           </table>
       </div>
   );
}
*/

'use client';

import axios from "axios";
import BorrarUsuario from "@/componentes/borrar";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter

// Componente que muestra los usuarios
export default function UsuariosPage() {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Estado para almacenar el usuario seleccionado

    useEffect(() => {
        const fetchUsuarios = async () => {
            const url = "http://localhost:3000/";
            try {
                const response = await axios.get(url);
                setUsuarios(response.data); // Actualiza el estado con los usuarios obtenidos
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsuarios(); // Llama a la función para obtener usuarios
    }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

    const mostrarDetalles = (usuario) => {
        console.log("ID del usuario seleccionado:", usuario.id); // Log para ver el ID del usuario
        if (usuarioSeleccionado && usuarioSeleccionado.id === usuario.id) {
            setUsuarioSeleccionado(null); // Cerrar detalles si el usuario ya está seleccionado
        } else {
            setUsuarioSeleccionado(usuario); // Seleccionar el nuevo usuario
        }
    };

    const redirigirAgregarUsuario = () => {
        router.push('/usuarios/crear');
    };

    return (
        <div className="container">
            <h1>Lista de Usuarios</h1>
            <button onClick={redirigirAgregarUsuario} className="btn btn-primary mb-3">
                Agregar usuario
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th> {/* Columna para acciones */}
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={usuario.id}>
                            <td>{index + 1}</td>
                            {/* Enlazamos el nombre del usuario a la función mostrarDetalles */}
                            <td>
                                <a
                                    href="#!"
                                    onClick={() => mostrarDetalles(usuario)}
                                    className="text-primary"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {usuario.nombre}
                                </a>
                            </td>
                            <td>
                                <Link href={`/usuarios/editarUsuario/${usuario.id}`}>
                                    <button className="btn btn-warning btn-sm" onClick={() => console.log("ID enviado para edición:", usuario.id)}>Editar</button>
                                </Link>

                                <BorrarUsuario id={usuario.id} /> {/* Acción para borrar usuario */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {usuarioSeleccionado && (
                <div className="mt-4">
                    <h2>Detalles del Usuario</h2>
                    <p><strong>ID:</strong> {usuarioSeleccionado.id}</p>
                    <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
                    <p><strong>Usuario:</strong> {usuarioSeleccionado.usuario}</p>
                    <p><strong>Tipo de Usuario:</strong> {usuarioSeleccionado.tipoUsuario}</p>
                </div>
            )}
        </div>
    );
}

