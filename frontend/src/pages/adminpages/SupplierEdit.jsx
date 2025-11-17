import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosCLient";
import { useNavigate, useParams } from "react-router-dom";

export default function SupplierEdit() {
  const [nombre, setNombre] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/suppliers/${id}`)
      .then((res) => setNombre(res.data.nombre))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.put(`/suppliers/${id}`, { nombre });
      navigate("/proveedores");
    } catch (error) {
      console.log(error);
      alert("Error editando proveedor");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>Editar Proveedor</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button className="btn btn-primary w-100">Guardar</button>
      </form>
    </div>
  );
}
