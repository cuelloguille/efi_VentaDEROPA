import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosCLient";

export default function SuppliersPage() {
  const [proveedores, setProveedores] = useState([]);

  const cargar = () => {
    axiosClient
      .get("/suppliers")
      .then((res) => setProveedores(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar proveedor?")) return;

    try {
      await axiosClient.delete(`/suppliers/${id}`);
      cargar();
    } catch (err) {
      console.log(err);
      alert("Error eliminando");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Proveedores</h2>

      <Link to="/proveedores/nuevo" className="btn btn-primary my-3">
        ➕ Nuevo Proveedor
      </Link>

      <ul className="list-group">
        {proveedores.map((prov) => (
          <li
            key={prov.id}
            className="list-group-item d-flex justify-content-between"
          >
            <span>{prov.nombre}</span>

            <div>
              <Link
                to={`/proveedores/editar/${prov.id}`}
                className="btn btn-sm btn-warning me-2"
              >
                Editar
              </Link>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => eliminar(prov.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
