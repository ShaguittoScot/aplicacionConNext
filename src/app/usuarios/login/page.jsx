"use client";
import axios from "axios";

async function validarLogin(e) {
    e.preventDefault();
    const url = "http://localhost:3000/login";
    const datos = {
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value
    };

    try {
        const response = await axios.post(url, datos);
        const usuario = response.data; // Asegúrate de manejar la respuesta según tu backend
        console.log("Usuario logueado:", usuario);
        // Aquí puedes manejar la redirección o guardar datos en el estado
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
    }
}

export default function Login() {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <form className="col-12 col-md-6 col-lg-4" action="">
                    <div className="card">
                        <div className="card-header">
                            <h1>Login</h1>
                        </div>
                        
                        <div className="card-body">
                            <input className="form-control mb-3" type="text" id="usuario" placeholder="Usuario" autoFocus />
                            <input className="form-control mb-3" type="password" id="password" placeholder="Password" />
                        </div>

                        <div className="card-footer">
                            <button className="btn btn-primary col-12" type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
