import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosCLient";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryEdit() {
  const [nombre, setNombre] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/categories/${id}`)
      .then((res) => setNombre(res.data.nombre))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.put(`/categories/${id}`, { nombre });
      navigate("/categorias");
    } catch (error) {
      console.log(error);
      alert("Error editando categoría");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>Editar Categoría</h2>

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
