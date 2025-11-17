import { useState } from "react";
import axiosClient from "../../api/axiosCLient";
import { useNavigate } from "react-router-dom";

export default function SupplierCreate() {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post("/suppliers", { nombre });
      navigate("/proveedores");
    } catch (error) {
      console.log(error);
      alert("Error creando proveedor");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>Nuevo Proveedor</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button className="btn btn-primary w-100">Crear</button>
      </form>
    </div>
  );
}
