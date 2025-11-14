const express = require("express");
const router = express.Router();
const clothesCtrl = require("../controllers/clothesController");
const auth = require("../midlewares/auth");
const checkRole = require("../midlewares/checkRole");

router.get("/", auth, clothesCtrl.getAll);
router.post("/", auth, checkRole("admin"), clothesCtrl.create);
router.put("/:id", auth, checkRole("admin"), clothesCtrl.update);
router.delete("/:id", auth, checkRole("admin"), clothesCtrl.remove);

module.exports = router;
