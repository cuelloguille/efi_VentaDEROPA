import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosCLient";
import { useNavigate, useParams } from "react-router-dom";

export default function ClotheEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ----------------------------
  // ESTADOS
  // ----------------------------
  const [nombre, setNombre] = useState("");
  const [talla, setTalla] = useState("S");
  const [color, setColor] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");

  const [proveedores, setProveedores] = useState([]);
  const [proveedor, setProveedor] = useState("");

  const [imagen, setImagen] = useState(null);
  const [imagenActual, setImagenActual] = useState("");

  // ----------------------------
  // CARGA DE DATOS
  // ----------------------------
  useEffect(() => {
    // Cargar la prenda por ID
    axiosClient
      .get(`/clothes/${id}`)
      .then((res) => {
        const c = res.data;

        setNombre(c.nombre);
        setTalla(c.talla);
        setColor(c.color);
        setPrecio(c.precio);
        setStock(c.stock);

        // ⚡ CORREGIDO: usar los campos correctos de Sequelize
        setCategoria(String(c.id_categoria || ""));
        setProveedor(String(c.id_proveedor || ""));

        setImagenActual(c.imagen);
      })
      .catch((err) => console.log(err));

    // Cargar categorías y proveedores para los selects
    axiosClient
      .get("/categories")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.log(err));

    axiosClient
      .get("/suppliers")
      .then((res) => setProveedores(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // ----------------------------
  // SUBMIT
  // ----------------------------
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
      formData.append("id_proveedor", proveedor);

      if (imagen) {
        formData.append("imagen", imagen);
      }

      const token = localStorage.getItem("token");

      await axiosClient.put(`/clothes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `bearer ${token}` : undefined,
        },
      });

      navigate("/listaPrendas");
    } catch (error) {
      console.log(error);
      alert("Error al editar la prenda");
    }
  };

  // ----------------------------
  // RENDER
  // ----------------------------
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Editar Prenda</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <select
          className="form-select mb-2"
          value={talla}
          onChange={(e) => setTalla(e.target.value)}
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>

        <input
          className="form-control mb-2"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        {/* SELECT CATEGORÍA */}
        <select
          className="form-select mb-2"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Seleccione categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={String(cat.id)}>
              {cat.nombre}
            </option>
          ))}
        </select>

        {/* SELECT PROVEEDOR */}
        <select
          className="form-select mb-2"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
        >
          <option value="">Seleccione proveedor</option>
          {proveedores.map((prov) => (
            <option key={prov.id} value={String(prov.id)}>
              {prov.nombre}
            </option>
          ))}
        </select>

        <p className="fw-bold mt-3 mb-1">Imagen actual:</p>
        {imagenActual ? (
          <img
            src={`http://localhost:4000/uploads/${imagenActual}`}
            alt="Imagen actual"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
            className="mb-3"
          />
        ) : (
          <p>No hay imagen</p>
        )}

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
        />

        <button className="btn btn-primary w-100">Guardar cambios</button>
      </form>
    </div>
  );
}
