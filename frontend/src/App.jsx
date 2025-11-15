import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import Navbar from "./componnets/navbar";  // ⬅️ IMPORTAR NAVBAR

import LoginPage from "./pages/LoginPage";
import ClothesPage from "./pages/ClothesList";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Navbar />   {/* ⬅️ NAVBAR SIEMPRE ARRIBA */}

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/prendas" element={<ClothesPage />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
