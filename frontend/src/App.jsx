import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import Navbar from "./componnets/navbar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ClothesList from "./pages/adminpages/ClothesList";
import ClotheForm from "./pages/adminpages/ClothesForm";
import ClotheEdit from "./pages/adminpages/ClotheEdit";

import PageClothes from "./pages/PageClothes";
import ClotheDetailUser from "./pages/PageClotheUser";
import CartPage from "./pages/CartPage";

// Categorías
import CategoriesPage from "./pages/adminpages/CategoriesPage";
import CategoryCreate from "./pages/adminpages/CategoryCreate";
import CategoryEdit from "./pages/adminpages/CategoryEdit";

// Proveedores
import SuppliersPage from "./pages/adminpages/SuppliersPage";
import SupplierCreate from "./pages/adminpages/SupplierCreate";
import SupplierEdit from "./pages/adminpages/SupplierEdit";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>

          {/* Auth */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Prendas */}
          <Route path="/listaPrendas" element={<ClothesList />} />
          <Route path="/prendas/nueva" element={<ClotheForm />} />
          <Route path="/prendas/editar/:id" element={<ClotheEdit />} />
          <Route path="/prendas" element={<PageClothes />} />
          <Route path="/prendas/:id" element={<ClotheDetailUser />} />

          {/* Carrito */}
          <Route path="/carrito" element={<CartPage />} />

          {/* Categorías */}
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/categorias/nueva" element={<CategoryCreate />} />
          <Route path="/categorias/editar/:id" element={<CategoryEdit />} />

          {/* Proveedores */}
          <Route path="/proveedores" element={<SuppliersPage />} />
          <Route path="/proveedores/nuevo" element={<SupplierCreate />} />
          <Route path="/proveedores/editar/:id" element={<SupplierEdit />} />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
