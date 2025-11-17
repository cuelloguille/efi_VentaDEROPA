import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosCLient";
import { useAuth } from "../auth/AuthContext";

// ================================
// FUNCIÓN GLOBAL PARA MOSTRAR TOAST
// ================================
const showToast = (mensaje) => {
  const toastArea = document.getElementById("toastArea");
  if (!toastArea) return;

  const toast = document.createElement("div");
  toast.className = "toast align-items-center text-white bg-success border-0";
  toast.role = "alert";
  toast.ariaLive = "assertive";
  toast.ariaAtomic = "true";

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${mensaje}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  toastArea.appendChild(toast);

  const bootToast = new bootstrap.Toast(toast);
  bootToast.show();

  toast.addEventListener("hidden.bs.toast", () => toast.remove());
};

export default function ClothesPageUser() {
  const [clothes, setClothes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [supFilter, setSupFilter] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { token } = useAuth();
  const navigate = useNavigate();

  const cargarClothes = () => {
    axiosClient
      .get("/clothes")
      .then((res) => setClothes(res.data))
      .catch((err) => console.log(err));
  };

  const cargarCategorias = () => {
    axiosClient
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const cargarProveedores = () => {
    axiosClient
      .get("/suppliers")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargarClothes();
    cargarCategorias();
    cargarProveedores();
  }, []);

  const filtrados = clothes.filter((c) => {
    const matchNombre = c.nombre.toLowerCase().includes(search.toLowerCase());
    const matchCategoria = catFilter === "" || c.Category?.id == catFilter;
    const matchProveedor = supFilter === "" || c.Supplier?.id == supFilter;

    const price = Number(c.precio);
    const matchMin = minPrice === "" || price >= Number(minPrice);
    const matchMax = maxPrice === "" || price <= Number(maxPrice);

    return (
      matchNombre &&
      matchCategoria &&
      matchProveedor &&
      matchMin &&
      matchMax
    );
  });

  const agregarCarrito = (item) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!carrito.find((p) => p.id === item.id)) {
      carrito.push(item);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      showToast("Producto agregado al carrito ✔️");
    } else {
      showToast("El producto ya está en el carrito");
    }
  };

  return (
    <div className="container mt-4">

     

{/* ================================ */}
{/* BUSCADOR DESPLEGABLE ESTÉTICO */}
{/* ================================ */}
<div className="dropdown mb-4 text-end">
  <button
    className="btn btn-dark shadow-lg dropdown-toggle d-flex align-items-center justify-content-center"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{
      width: "55px",
      height: "55px",
      borderRadius: "50%",
      fontSize: "20px",
    }}
  >
    <i className="bi bi-search"></i>
  </button>

  <div
    className="dropdown-menu p-4 shadow-lg border-0 rounded-4 animate__animated animate__fadeIn"
    style={{
      minWidth: "380px",
      background: "#ffffff",
    }}
  >
    <h5 className="fw-bold mb-3 border-bottom pb-2">
      <i className="bi bi-funnel"></i> Filtros
    </h5>

    {/* Buscar por nombre */}
    <label className="form-label fw-semibold">Nombre</label>
    <div className="input-group mb-3">
      <span className="input-group-text bg-dark text-white">
        <i className="bi bi-type"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Categorías */}
    <label className="form-label fw-semibold mt-2">Categoría</label>
    <div className="input-group mb-3">
      <span className="input-group-text bg-primary text-white">
        <i className="bi bi-layers"></i>
      </span>
      <select
        className="form-select"
        value={catFilter}
        onChange={(e) => setCatFilter(e.target.value)}
      >
        <option value="">Todas</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>
    </div>

    {/* Proveedores */}
    <label className="form-label fw-semibold mt-2">Proveedor</label>
    <div className="input-group mb-3">
      <span className="input-group-text bg-success text-white">
        <i className="bi bi-truck"></i>
      </span>
      <select
        className="form-select"
        value={supFilter}
        onChange={(e) => setSupFilter(e.target.value)}
      >
        <option value="">Todos</option>
        {suppliers.map((sp) => (
          <option key={sp.id} value={sp.id}>
            {sp.nombre}
          </option>
        ))}
      </select>
    </div>

    {/* Rango de precio */}
    <label className="form-label fw-semibold mt-2">
      Precio
    </label>
    <div className="d-flex gap-2">
      <input
        type="number"
        className="form-control"
        placeholder="Mín."
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        className="form-control"
        placeholder="Máx."
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>

    <div className="mt-4 text-end">
      <button
        className="btn btn-outline-secondary me-2"
        onClick={() => {
          setSearch("");
          setCatFilter("");
          setSupFilter("");
          setMinPrice("");
          setMaxPrice("");
        }}
      >
        <i className="bi bi-x-circle"></i> Limpiar
      </button>
      <button className="btn btn-dark">
        <i className="bi bi-check2-circle"></i> Aplicar
      </button>
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

              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{c.nombre}</h5>

                <p className="text-muted small">
                  {c.Category?.nombre || "Sin categoría"} •{" "}
                  {c.Supplier?.nombre || "Proveedor desconocido"} •{" "}
                  {c.precio ? `$${c.precio}` : "Sin precio"}
                </p>

                <div className="mt-auto d-flex align-items-center">
                  <Link
                    to={`/prendas/${c.id}`}
                    className="btn btn-primary me-2"
                  >
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
