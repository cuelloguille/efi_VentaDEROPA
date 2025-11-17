import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, rol, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg px-3 ${
        rol === "admin" ? "navbar-dark bg-primary" : "navbar-dark bg-dark"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/prendas">
          {rol === "admin" ? "Bienvenido Admin" : "ClotStore"}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto">
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registro</Link>
                </li>
              </>
            )}

            {token && rol === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/listaPrendas">
                  Panel de administracion 
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Prendas">
                  Vista user
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}

            {token && rol === "user" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/prendas">
                    Lista de Prendas
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
