import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import axiosClient from "../api/axiosCLient";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosClient.post("/users/login", { correo, contraseña });

      // Guardar token y rol
      login(res.data.token, res.data.user.rol);

      // Redirigir según rol
      if (res.data.user.rol === "admin") navigate("/listaPrendas");
      else navigate("/prendas");
    } catch (err) {
      setError(err.response?.data?.msg || "Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">Iniciar Sesión</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleLogin}>
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

        <button className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
}
