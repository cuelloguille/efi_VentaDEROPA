const express = require("express");
const cors = require("cors"); // ✅ Importar cors
require("dotenv").config();
const sequelize = require("./config/database");

// Importar modelos (para que Sequelize cree las tablas)
const User = require("./models/Users");
const Clothe = require("./models/Clothes");
const Sale = require("./models/Sales");
const SaleDetail = require("./models/SaleDetails");
const categoryDetail = require("./models/Category");
const supplierDetail = require("./models/Supplier");

// Importar rutas
const userRoutes = require("./routes/userRoutes");
const clothesRoutes = require("./routes/clothesRoutes");
const salesRoutes = require("./routes/saleRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); 
const supplierRoutes = require("./routes/supplierRoutes")
const Email = require("./routes/EmailRoutes");

const app = express();

// ✅ Middleware CORS
app.use(cors({
  origin: "http://localhost:5173", // Origen permitido (tu frontend)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
  credentials: true, // Si usas cookies o auth
}));

// ✅ Middleware para parsear JSON
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Rutas principales
app.use("/uploads", express.static("uploads"));
app.use("/users", userRoutes);
app.use("/clothes", clothesRoutes);
app.use("/sales", salesRoutes);
app.use("/categories", categoryRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/email", Email);

// Sincronizar DB y levantar servidor
sequelize
  .sync({ alter: true }) // ⚠️ cambiar a { force: true } si querés recrear tablas
  .then(() => {
    console.log("Base de datos sincronizada ✅");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Servidor en http://localhost:${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => console.error("Error al conectar DB:", err));
