import axios from "axios";

async function getNoticias() {
    const url = "http://universities.hipolabs.com/search?country=Mexico";
    const Universidades = await axios.get(url);
    return Universidades.data;
}

export default async function Universidades() {
    const universidades = await getNoticias();
    
    return (
        <>
            <h1>Universidades</h1>
            <table className="Tabla">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Universidades</th>
                        <th>Sitio web</th>
                    </tr>
                </thead>
                <tbody>
                    {universidades.map((universidad, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{universidad.name}</td>
                            <td><a href={universidad.web_pages[0]} target="_blank" rel="noopener noreferrer">{universidad.web_pages[0]}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
