import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosCLient";
import { Link } from "react-router-dom";

export default function ClothesPage() {
  const [clothes, setClothes] = useState([]);

  const cargar = () => {
    axiosClient.get("/clothes")
      .then(res => setClothes(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminarPrenda = async (id) => {
    if (!confirm("¿Seguro que querés eliminar esta prenda?")) return;

    try {
      const token = localStorage.getItem("token");

      await axiosClient.delete(`/clothes/${id}`, {
        headers: { Authorization: `bearer ${token}` }
      });

      cargar(); // refrescar tabla
    } catch (error) {
      console.log(error);
      alert("Error al eliminar la prenda");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Prendas</h2>

      <Link to="/prendas/nueva" className="btn btn-success mb-3">
        Crear nueva
      </Link>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Talla</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Acciones</th> {/* nueva columna */}
          </tr>
        </thead>
        <tbody>
          {clothes.map(c => (
            <tr key={c.id}>
              <td>
                {c.imagen ? (
                  <img 
                    src={`http://localhost:4000/uploads/${c.imagen}`} 
                    alt={c.nombre} 
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                ) : (
                  <span>No hay imagen</span>
                )}
              </td>

              <td>{c.nombre}</td>
              <td>{c.talla}</td>
              <td>{c.color}</td>
              <td>${c.precio}</td>
              <td>{c.stock}</td>

              <td>{c.Category?.nombre || "-"}</td>
              <td>{c.Supplier?.nombre || "-"}</td>

              {/* ACCIONES */}
              <td>
                <Link
                  to={`/prendas/editar/${c.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Editar
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarPrenda(c.id)}
                >
                  Eliminar
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
