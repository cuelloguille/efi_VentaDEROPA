import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

// ================================
// FUNCIÓN GLOBAL PARA MOSTRAR TOAST
// ================================
const showToast = (mensaje, tipo = "success") => {
  const toastArea = document.getElementById("toastArea");
  if (!toastArea) return;

  let bg = "bg-success";
  if (tipo === "error") bg = "bg-danger";
  if (tipo === "warn") bg = "bg-warning text-dark";

  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white ${bg} border-0`;
  toast.role = "alert";
  toast.ariaLive = "assertive";
  toast.ariaAtomic = "true";

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${mensaje}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  toastArea.appendChild(toast);
  const bootToast = new bootstrap.Toast(toast);
  bootToast.show();

  toast.addEventListener("hidden.bs.toast", () => toast.remove());
};

export default function CarritoPage() {
  const [carrito, setCarrito] = useState([]);
  const { token } = useAuth();

  const [precioFiltro, setPrecioFiltro] = useState("");
  const [orden, setOrden] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);
  }, []);

  const guardar = (items) => {
    setCarrito(items);
    localStorage.setItem("carrito", JSON.stringify(items));
  };

  const eliminar = (id) => {
    guardar(carrito.filter((p) => p.id !== id));
    showToast("Producto eliminado del carrito 🗑️", "warn");
  };

  const vaciar = () => {
    guardar([]);
    showToast("Carrito vaciado ❗", "warn");
  };

  const total = carrito.reduce((acc, item) => acc + Number(item.precio), 0);

  const finalizarCompra = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/email/enviar-correo",
        { items: carrito, total: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.ok) {
        showToast("Compra realizada ✔️ ¡Correo enviado!", "success");
        vaciar();
      }
    } catch (err) {
      console.log(err);
      showToast("Error enviando el correo ❌", "error");
    }
  };

  let carritoFiltrado = carrito.filter(
    (item) =>
      precioFiltro === "" || Number(item.precio) <= Number(precioFiltro)
  );

  if (orden === "asc") {
    carritoFiltrado = [...carritoFiltrado].sort(
      (a, b) => Number(a.precio) - Number(b.precio)
    );
  } else if (orden === "desc") {
    carritoFiltrado = [...carritoFiltrado].sort(
      (a, b) => Number(b.precio) - Number(a.precio)
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-center mb-4">Tu Carrito</h2>

      {carrito.length > 0 && (
        <div className="mb-4 d-flex gap-3">
          <input
            type="number"
            className="form-control"
            placeholder="Filtrar por precio máximo..."
            value={precioFiltro}
            onChange={(e) => setPrecioFiltro(e.target.value)}
          />

          <select
            className="form-select w-auto"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="">Ordenar...</option>
            <option value="asc">Precio menor a mayor</option>
            <option value="desc">Precio mayor a menor</option>
          </select>
        </div>
      )}

      {carritoFiltrado.length === 0 ? (
        <div className="text-center">
          <h4 className="text-muted">No hay productos para mostrar</h4>
          <Link to="/prendas" className="btn btn-primary mt-3">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <>
          <div className="list-group mb-4">
            {carritoFiltrado.map((item) => {
              // 🔥 DETECTAR SI ES ZAPATILLA
              const esZapatilla =
                item.categoria?.toLowerCase() === "zapatillas" ||
                item.Category?.nombre?.toLowerCase() === "zapatillas";

              const tallesRopa = ["S", "M", "L", "XL"];
              const tallesZapatilla = ["39", "40", "41", "42", "43", "44"];

              const talles = esZapatilla ? tallesZapatilla : tallesRopa;

              return (
                <div
                  key={item.id}
                  className="list-group-item d-flex align-items-center"
                >
                  <img
                    src={`http://localhost:4000/uploads/${item.imagen}`}
                    alt={item.nombre}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                    className="rounded me-3"
                  />

                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.nombre}</h5>
                    <p className="mb-1 text-muted">${item.precio}</p>

                    {/* ⭐ Selector de talla dinámico */}
                    <div className="d-flex align-items-center">
                      <label className="me-2 fw-semibold">Talle:</label>
                      <select
                        className="form-select form-select-sm w-auto"
                        value={item.talla || talles[0]}
                        onChange={(e) => {
                          const nuevaTalla = e.target.value;

                          const actualizado = carrito.map((p) =>
                            p.id === item.id ? { ...p, talla: nuevaTalla } : p
                          );

                          guardar(actualizado);
                          showToast("Talle actualizado ✔️", "success");
                        }}
                      >
                        {talles.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => eliminar(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="card p-3 shadow-sm">
            <h4 className="fw-bold">Total: ${total}</h4>

            <div className="d-flex mt-3">
              <button className="btn btn-danger me-3" onClick={vaciar}>
                Vaciar carrito
              </button>

              <button className="btn btn-success" onClick={finalizarCompra}>
                Finalizar compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
