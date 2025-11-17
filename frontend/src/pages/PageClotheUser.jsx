import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosCLient";
import { Toast } from "bootstrap";

export default function ClotheDetailUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clothe, setClothe] = useState(null);

  // Toast Ref
  const toastRef = useRef(null);

  // Mostrar Toast
  const showToast = (mensaje, tipo = "success") => {
    const toastElement = toastRef.current;
    if (!toastElement) return;

    toastElement.classList.remove("text-bg-success", "text-bg-danger");
    toastElement.classList.add(
      tipo === "success" ? "text-bg-success" : "text-bg-danger"
    );

    toastElement.querySelector(".toast-body").textContent = mensaje;

    const toast = new Toast(toastElement);
    toast.show();
  };

  useEffect(() => {
    axiosClient
      .get(`/clothes/${id}`)
      .then((res) => setClothe(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // ----------------------------
  // AGREGAR AL CARRITO
  // ----------------------------
  const agregarCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find((p) => p.id === clothe.id);
    if (!existe) {
      carrito.push(clothe);
      showToast("Producto agregado al carrito 🛒", "success");
    } else {
      showToast("Este producto ya está en tu carrito", "danger");
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Si querés redirigir:
    // navigate("/carrito");
  };

  if (!clothe) {
    return (
      <div className="container mt-5 text-center">
        <h4>Cargando prenda...</h4>
      </div>
    );
  }

  return (
    <>
      {/* ================================
          TOAST BOTTOM RIGHT
      ================================= */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          ref={toastRef}
          className="toast align-items-center text-white border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">Mensaje</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>

      {/* ================================
          CONTENIDO
      ================================= */}
      <div className="container mt-5" style={{ maxWidth: "900px" }}>
        <div className="card shadow-lg p-4">
          <div className="row">

            {/* IMAGEN */}
            <div className="col-md-5 d-flex justify-content-center">
              {clothe.imagen ? (
                <img
                  src={`http://localhost:4000/uploads/${clothe.imagen}`}
                  alt={clothe.nombre}
                  className="img-fluid rounded"
                  style={{ maxHeight: "350px", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "350px",
                    background: "#eaeaea",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#777",
                  }}
                >
                  Sin imagen
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="col-md-7 mt-4 mt-md-0">
              <h2 className="fw-bold">{clothe.nombre}</h2>

              <p className="mb-2"><strong>Talla:</strong> {clothe.talla}</p>
              <p className="mb-2"><strong>Color:</strong> {clothe.color}</p>
              <p className="mb-2"><strong>Precio:</strong> ${clothe.precio}</p>
              <p className="mb-2"><strong>Stock:</strong> {clothe.stock}</p>

              <p className="text-muted">
                <strong>Categoría:</strong> {clothe.Category?.nombre || "-"} <br />
                <strong>Proveedor:</strong> {clothe.Supplier?.nombre || "-"}
              </p>

              <hr />

              <h5 className="mt-3">Descripción</h5>
              <p className="text-muted">
                Esta es una prenda de alta calidad, seleccionada especialmente confiando
                en el confort y lo que representa nuestra marca.
              </p>

              <div className="d-flex gap-2 mt-3">
                <Link to="/prendas" className="btn btn-secondary">
                  ← Volver al catálogo
                </Link>

                <button onClick={agregarCarrito} className="btn btn-primary">
                  Agregar al carrito 🛒
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
