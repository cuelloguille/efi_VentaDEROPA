import { useEffect, useState } from "react";
import axiosClient from "../api/axiosCLient";

export default function ClothesPage() {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    axiosClient.get("/clothes")
      .then(res => setClothes(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Prendas</h2>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Talla</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {clothes.map(c => (
            <tr key={c.id}>
              <td>{c.nombre}</td>
              <td>{c.talla}</td>
              <td>{c.color}</td>
              <td>${c.precio}</td>
              <td>{c.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
