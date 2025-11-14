// routes/supplierRoutes.js
const express = require("express");
const router = express.Router();
const supplierCtrl = require("../controllers/supplierController");
const auth = require("../midlewares/auth");
const checkRole = require("../midlewares/checkRole"); // Importa checkRole

router.get("/", auth, supplierCtrl.getAll);
router.post("/", auth, checkRole("admin"), supplierCtrl.create);
router.put("/:id", auth, checkRole("admin"), supplierCtrl.update);
router.delete("/:id", auth, checkRole("admin"), supplierCtrl.remove);

module.exports = router;