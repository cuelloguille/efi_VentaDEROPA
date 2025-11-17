import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosCLient";
import { Link } from "react-router-dom";

export default function ClothesPage() {
  const [clothes, setClothes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroProveedor, setFiltroProveedor] = useState("");

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

      cargar();
    } catch (error) {
      console.log(error);
      alert("Error al eliminar la prenda");
    }
  };

  // ============================================
  // FILTROS
  // ============================================
  const prendasFiltradas = clothes.filter((c) => {
    const coincideNombre = c.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideCategoria = filtroCategoria ? c.Category?.nombre === filtroCategoria : true;
    const coincideProveedor = filtroProveedor ? c.Supplier?.nombre === filtroProveedor : true;

    return coincideNombre && coincideCategoria && coincideProveedor;
  });

  // Categorías únicas
  const categorias = [...new Set(clothes.map(c => c.Category?.nombre).filter(Boolean))];

  // Proveedores únicos
  const proveedores = [...new Set(clothes.map(c => c.Supplier?.nombre).filter(Boolean))];

  return (
    <div className="container mt-4">
      <h2>Prendas</h2>

      <Link to="/prendas/nueva" className="btn btn-success mb-3">
        Crear nueva
      </Link>

      {/* ====================== */}
      {/* FILTROS */}
      {/* ====================== */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-3">

          {/* Buscar por nombre */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Buscar por nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Remera, Campera..."
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </div>

          {/* Filtrar por categoría */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Categoría</label>
            <select
              className="form-select"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Filtrar por proveedor */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Proveedor</label>
            <select
              className="form-select"
              value={filtroProveedor}
              onChange={(e) => setFiltroProveedor(e.target.value)}
            >
              <option value="">Todos</option>
              {proveedores.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* ====================== */}
      {/* TABLA */}
      {/* ====================== */}
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
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {prendasFiltradas.map((c) => (
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
