import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Siempre registrar rol user
      const body = {
        nombre,
        correo,
        contraseña,
        rol: "user",
      };

      const res = await axios.post(
        "http://localhost:4000/users/register",
        body
      );

      setMensaje("Registro exitoso ✔");

      // Redirigir después de 1 segundo
      setTimeout(() => navigate("/"), 1000);

    } catch (error) {
      console.error("ERROR BACKEND:", error.response?.data ?? error.message);

      setMensaje(
        error.response?.data?.error ||
        error.response?.data?.msg ||
        "Error al registrar usuario"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Registro</h3>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          {/* No se muestra, pero asegura que el form tenga el rol */}
          <input type="hidden" name="rol" value="user" />

          <button type="submit" className="btn btn-primary w-100">
            Registrarme
          </button>
        </form>

        {mensaje && (
          <div className="alert alert-info text-center mt-3" role="alert">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
