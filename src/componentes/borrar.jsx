"use client"
import Link from "next/link";
import axios from "axios";

export default function BorrarUsuario({id}) {

    async function borrar() {
        //console.log("Estas en borrar");
        const url = "http://localhost:3000/borrarUsuario/"+id;
        console.log(url);   
        const respuesta = await axios.get(url);
        console.log("respuesta de borrar: ",respuesta)
        window.location.replace("/usuarios/mostrar")
    }
    //console.log("Borrar,Id recibido:",id);
    return(
        <>
        <Link href="#" onClick={borrar}>Borrar</Link>
        </>
    );
}