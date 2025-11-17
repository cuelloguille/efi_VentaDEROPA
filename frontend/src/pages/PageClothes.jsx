import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosCLient";
import { useAuth } from "../auth/AuthContext";

export default function ClothesPageUser() {
  const [clothes, setClothes] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  const cargar = () => {
    axiosClient
      .get("/clothes")
      .then((res) => setClothes(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargar();
  }, []);

  // ----------------------------------
  // AGREGAR AL CARRITO
  // ----------------------------------
  const agregarCarrito = (item) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Evitar agregar duplicados
    const existe = carrito.find((p) => p.id === item.id);
    if (!existe) carrito.push(item);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    navigate("/carrito"); // ir al carrito
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold">Catálogo de Prendas</h2>

      {/* GRID */}
      <div className="row g-4">
        {clothes.map((c) => (
          <div key={c.id} className="col-12 col-sm-6 col-md-4 col-lg-3">

            <div className="card shadow-sm h-100">

              {/* IMAGEN */}
              {c.imagen ? (
                <img
                  src={`http://localhost:4000/uploads/${c.imagen}`}
                  className="card-img-top"
                  alt={c.nombre}
                  style={{ height: "220px", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    height: "220px",
                    background: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#777",
                    fontSize: "14px",
                  }}
                >
                  Sin imagen
                </div>
              )}

              {/* CONTENIDO */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{c.nombre}</h5>

                {/* BOTONES */}
                <div className="mt-auto d-flex align-items-center">
                  <Link to={`/prendas/${c.id}`} className="btn btn-primary me-2">
                    Info
                  </Link>

                  {token && (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => agregarCarrito(c)}
                    >
                      <i className="bi bi-cart fs-5"></i>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
