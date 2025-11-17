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

        {/* HOME ICONO A LA IZQUIERDA */}
        <Link className="navbar-brand d-flex align-items-center" to="/prendas">
          <i className="bi bi-house-door-fill fs-4 me-2"></i>
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

            {/* LINKS PARA NO LOGUEADOS */}
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

            {/* LINKS ADMIN */}
            {token && rol === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/listaPrendas">
                    Panel de administración
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/prendas">
                    Vista User
                  </Link>
                </li>
              </>
            )}


            {/* CARRITO */}
            {token && (
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link fs-4" to="/carrito" title="Carrito">
                  <i className="bi bi-cart"></i>
                </Link>
              </li>
            )}

            {/* BOTÓN DE LOGOUT CON ICONO DE APAGADO */}
            {token && (
              <li className="nav-item">
                <button
                  className="btn btn-danger ms-2 d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <i className="bi bi-power fs-5 me-1"></i>
                  Salir
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
