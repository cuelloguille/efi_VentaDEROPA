import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosCLient";

export default function ClothesPageUser() {
  const [clothes, setClothes] = useState([]);

  const cargar = () => {
    axiosClient
      .get("/clothes")
      .then(res => setClothes(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold">Catálogo de Prendas</h2>

      {/* GRID */}
      <div className="row g-4">
        {clothes.map(c => (
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

                
                {/* BOTÓN */}
                <div className="mt-auto">
                  <Link to={`/prendas/${c.id}`} className="btn btn-primary w-100">
                    Info
                  </Link>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
