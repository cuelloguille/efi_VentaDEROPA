import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
           Venta de Ropa
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto">

            {/* SI ESTÁ LOGUEADO */}
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/prendas">
                    Prendas
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              /* SI NO ESTÁ LOGUEADO */
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registro
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}
