import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import Navbar from "./componnets/navbar";  // ⬅️ IMPORTAR NAVBAR

import LoginPage from "./pages/LoginPage";
import ClothesList from "./pages/adminpages/ClothesList";
import RegisterPage from "./pages/RegisterPage";
import ClotheForm from "./pages/adminpages/ClothesForm";
import ClotheEdit from "./pages/adminpages/ClotheEdit";
import PageClothes from "./pages/PageClothes";
import ClotheDetailUser from "./pages/PageClotheUser";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Navbar />   {/* ⬅️ NAVBAR SIEMPRE ARRIBA */}

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/listaPrendas" element={<ClothesList />} />
          <Route path="/prendas/nueva" element={<ClotheForm />} />
          <Route path="/prendas/editar/:id" element={<ClotheEdit />} />
          <Route path="/prendas" element={<PageClothes />} />
          <Route path="/prendas/:id" element={<ClotheDetailUser />} />
          <Route path="/carrito" element={<CartPage />} />

          
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
