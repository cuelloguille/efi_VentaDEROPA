import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext"; // ⬅ si usás AuthContext

export default function CarritoPage() {
  const [carrito, setCarrito] = useState([]);
  const { token } = useAuth(); // ⬅ token para enviar email autenticado

  // Cargar carrito desde localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);
  }, []);

  // Guardar cambios
  const guardar = (items) => {
    setCarrito(items);
    localStorage.setItem("carrito", JSON.stringify(items));
  };

  // Eliminar item
  const eliminar = (id) => {
    guardar(carrito.filter((p) => p.id !== id));
  };

  // Vaciar carrito
  const vaciar = () => {
    guardar([]);
  };

  // Calcular total
  const total = carrito.reduce((acc, item) => acc + Number(item.precio), 0);

  // ===========================
  // FINALIZAR COMPRA (EMAIL)
  // ===========================
  const finalizarCompra = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/email/enviar-correo",
        {
          items: carrito,
          total: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ⬅ IMPORTANTE
          },
        }
      );

      if (res.data.ok) {
        alert("Compra realizada. Se envió un correo con el detalle.");
        vaciar();
      }
    } catch (err) {
      console.log(err);
      alert("Error enviando el correo.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-center mb-4">Tu Carrito</h2>

      {carrito.length === 0 ? (
        <div className="text-center">
          <h4 className="text-muted">El carrito está vacío</h4>
          <Link to="/prendas" className="btn btn-primary mt-3">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <>
          <div className="list-group mb-4">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex align-items-center"
              >
                {/* Imagen */}
                <img
                  src={`http://localhost:4000/uploads/${item.imagen}`}
                  alt={item.nombre}
                  style={{ width: "70px", height: "70px", objectFit: "cover" }}
                  className="rounded me-3"
                />

                {/* Info */}
                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.nombre}</h5>
                  <p className="mb-0 text-muted">${item.precio}</p>
                </div>

                {/* Eliminar */}
                <button
                  className="btn btn-outline-danger"
                  onClick={() => eliminar(item.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Total y acciones */}
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
