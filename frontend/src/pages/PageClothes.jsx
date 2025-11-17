import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosCLient";
import { useAuth } from "../auth/AuthContext";

export default function ClothesPageUser() {
  const [clothes, setClothes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [supFilter, setSupFilter] = useState("");

  const { token } = useAuth();
  const navigate = useNavigate();

  // ================================
  // CARGA DE DATOS
  // ================================
  const cargarClothes = () => {
    axiosClient.get("/clothes")
      .then((res) => setClothes(res.data))
      .catch((err) => console.log(err));
  };

  const cargarCategorias = () => {
    axiosClient.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const cargarProveedores = () => {
    axiosClient.get("/suppliers")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargarClothes();
    cargarCategorias();
    cargarProveedores();
  }, []);

  // ================================
  // FILTRADO EN TIEMPO REAL
  // ================================
  const filtrados = clothes.filter((c) => {
    const matchNombre = c.nombre
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategoria = catFilter === "" || c.Category?.id == catFilter;

    const matchProveedor = supFilter === "" || c.Supplier?.id == supFilter;

    return matchNombre && matchCategoria && matchProveedor;
  });

  // ================================
  // AGREGAR AL CARRITO
  // ================================
  const agregarCarrito = (item) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (!carrito.find((p) => p.id === item.id)) carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    navigate("/carrito");
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4 fw-bold">Catálogo de Prendas</h2>

      {/* ================================ */}
      {/* BUSCADOR ESTÉTICO */}
      {/* ================================ */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="row g-3">

          {/* Buscar por nombre */}
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Categorías */}
          <div className="col-lg-4">
            <select
              className="form-select"
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
            >
              <option value="">Categoría (todas)</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Proveedores */}
          <div className="col-lg-4">
            <select
              className="form-select"
              value={supFilter}
              onChange={(e) => setSupFilter(e.target.value)}
            >
              <option value="">Proveedor (todos)</option>
              {suppliers.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.nombre}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* ================================ */}
      {/* GRID DE PRENDAS */}
      {/* ================================ */}
      <div className="row g-4">
        {filtrados.map((c) => (
          <div key={c.id} className="col-12 col-sm-6 col-md-4 col-lg-3">

            <div className="card shadow-sm h-100 border-0 rounded-4">

              {/* Imagen */}
              {c.imagen ? (
                <img
                  src={`http://localhost:4000/uploads/${c.imagen}`}
                  className="card-img-top rounded-top-4"
                  alt={c.nombre}
                  style={{ height: "220px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-top-4 bg-light d-flex justify-content-center align-items-center"
                  style={{ height: "220px", color: "#777" }}
                >
                  Sin imagen
                </div>
              )}

              {/* Info */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{c.nombre}</h5>

                <p className="text-muted small">
                {c.Category?.nombre || "Sin categoría"} •{" "}
                {c.Supplier?.nombre || "Proveedor desconocido"} •{" "}
                {c.precio ? `$${c.precio}` : "Sin precio"}
                </p>


                <div className="mt-auto d-flex align-items-center">
                  <Link to={`/prendas/${c.id}`} className="btn btn-primary me-2">
                    Info
                  </Link>

                  {token && (
                    <button
                      className="btn btn-outline-dark"
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
