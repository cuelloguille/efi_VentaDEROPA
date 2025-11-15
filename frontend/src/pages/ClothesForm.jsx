import { useState, useEffect } from "react";
import axiosClient from "../api/axiosCLient.js";
import { useNavigate } from "react-router-dom";

export default function ClotheForm() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [talla, setTalla] = useState("S");
  const [color, setColor] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState(null); // <-- nuevo estado para la imagen
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    axiosClient.get("/categories").then(res => setCategorias(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("talla", talla);
      formData.append("color", color);
      formData.append("precio", precio);
      formData.append("stock", stock);
      formData.append("id_categoria", categoria);
      if (imagen) formData.append("imagen", imagen);

      // Si tu backend requiere token de auth
      const token = localStorage.getItem("token");

      await axiosClient.post("/clothes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      setMensaje("Prenda creada correctamente!");
      navigate("/prendas");
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear la prenda");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Crear Prenda</h2>
      {mensaje && <p className="text-danger">{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <select
          className="form-select mb-2"
          value={talla}
          onChange={e => setTalla(e.target.value)}
          required
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        <input
          className="form-control mb-2"
          placeholder="Color"
          value={color}
          onChange={e => setColor(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={e => setStock(e.target.value)}
          required
        />
        <select
          className="form-select mb-2"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          required
        >
          <option value="">Seleccione categoría</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>

        {/* Input para subir imagen */}
        <input
          className="form-control mb-2"
          type="file"
          accept="image/*"
          onChange={e => setImagen(e.target.files[0])}
        />

        <button className="btn btn-primary w-100">Crear</button>
      </form>
    </div>
  );
}
