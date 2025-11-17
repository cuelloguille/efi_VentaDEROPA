import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosCLient";

export default function CategoriesPage() {
  const [categorias, setCategorias] = useState([]);

  const cargar = () => {
    axiosClient
      .get("/categories")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar categoría?")) return;

    try {
      await axiosClient.delete(`/categories/${id}`);
      cargar();
    } catch (err) {
      console.log(err);
      alert("Error eliminando");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Categorías</h2>

      <Link to="/categorias/nueva" className="btn btn-primary my-3">
        ➕ Nueva Categoría
      </Link>

      <ul className="list-group">
        {categorias.map((cat) => (
          <li
            key={cat.id}
            className="list-group-item d-flex justify-content-between"
          >
            <span>{cat.nombre}</span>

            <div>
              <Link
                to={`/categorias/editar/${cat.id}`}
                className="btn btn-sm btn-warning me-2"
              >
                Editar
              </Link>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => eliminar(cat.id)}
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
