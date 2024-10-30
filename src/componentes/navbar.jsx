

import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link href="/" legacyBehavior>
                        <a className="navbar-brand">Home</a>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link href="/compras/mostrar" legacyBehavior>
                                    <a className="nav-link active" aria-current="page">
                                        Compras
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/productos/mostrar" legacyBehavior>
                                    <a className="nav-link">Productos</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/usuarios//mostrar" legacyBehavior>
                                    <a className="nav-link">Usuarios</a>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link href="#" legacyBehavior>
                                            <a className="dropdown-item">Action</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" legacyBehavior>
                                            <a className="dropdown-item">Another action</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link href="#" legacyBehavior>
                                            <a className="dropdown-item">Something else here</a>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link href="/" legacyBehavior>
                                    <a className="nav-link disabled" aria-disabled="true">
                                        Disabled
                                    </a>
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}
