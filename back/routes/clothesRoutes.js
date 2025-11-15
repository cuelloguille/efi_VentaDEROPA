const express = require("express");
const router = express.Router();
const clothesCtrl = require("../controllers/clothesController");
const auth = require("../midlewares/auth");
const checkRole = require("../midlewares/checkRole");
const upload = require("../midlewares/uploads"); // <-- agregado

// Obtener todas las prendas (cualquier usuario logueado)
router.get("/", auth, clothesCtrl.getAll);

// Crear prenda con imagen (solo admin)
router.post(
  "/", 
  auth, 
  checkRole("admin"), 
  upload.single("imagen"), // <-- multer para subir imagen
  clothesCtrl.create
);

// Actualizar prenda (puede incluir nueva imagen) (solo admin)
router.put(
  "/:id", 
  auth, 
  checkRole("admin"), 
  upload.single("imagen"), // <-- multer para actualizar imagen
  clothesCtrl.update
);

// Eliminar prenda (solo admin)
router.delete("/:id", auth, checkRole("admin"), clothesCtrl.remove);

module.exports = router;
