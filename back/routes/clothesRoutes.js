const express = require("express");
const router = express.Router();
const clothesCtrl = require("../controllers/clothesController");
const auth = require("../midlewares/auth");
const checkRole = require("../midlewares/checkRole");
const upload = require("../midlewares/uploads");

// Obtener todas las prendas
router.get("/", auth, clothesCtrl.getAll);

// Crear prenda con imagen (solo admin)
router.post(
  "/", 
  auth,
  checkRole("admin"),
  upload.single("imagen"),
  clothesCtrl.create
);

// Actualizar prenda (solo admin)
router.put(
  "/:id",
  auth,
  checkRole("admin"),
  upload.single("imagen"),
  clothesCtrl.update
);

// Eliminar prenda (solo admin)
router.delete("/:id", auth, checkRole("admin"), clothesCtrl.remove);

// Obtener una sola prenda por ID (cualquier user logueado)
router.get("/:id", auth, clothesCtrl.getOne);

module.exports = router;
