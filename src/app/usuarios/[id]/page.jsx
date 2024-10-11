import axios from 'axios';

async function getUser(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
}

export default async function UserDetailPage({ params }) {
    const user = await getUser(params.id);

    return (
        <>
            <h1>Detalles del Usuario</h1>
            <table>
                <tbody>
                    <tr>
                        <td><strong>ID:</strong></td>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Nombre:</strong></td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Username:</strong></td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td><strong>Teléfono:</strong></td>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <td><strong>Sitio Web:</strong></td>
                        <td>{user.website}</td>
                    </tr>
                    <tr>
                        <td><strong>Compañía:</strong></td>
                        <td>{user.company.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Dirección:</strong></td>
                        <td>{`${user.address.street}, ${user.address.city}`}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}