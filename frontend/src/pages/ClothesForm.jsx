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

  useEffect(() => {
    axiosClient.get("/categories").then(res => setCategorias(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosClient.post("/clothes", {
      nombre, talla, color, precio, stock, id_categoria: categoria
    });
    navigate("/prendas");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Crear Prenda</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <select className="form-select mb-2" value={talla} onChange={e => setTalla(e.target.value)} required>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        <input className="form-control mb-2" placeholder="Color" value={color} onChange={e => setColor(e.target.value)} required />
        <input className="form-control mb-2" type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} required />
        <input className="form-control mb-2" type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required />
        <select className="form-select mb-2" value={categoria} onChange={e => setCategoria(e.target.value)} required>
          <option value="">Seleccione categoría</option>
          {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
        </select>
        <button className="btn btn-primary w-100">Crear</button>
      </form>
    </div>
  );
}
