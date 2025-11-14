import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import ClothesPage from "./pages/ClothesList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/prendas" element={<ClothesPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
