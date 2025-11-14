// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/categoryController");
const auth = require("../midlewares/auth");
const checkRole = require("../midlewares/checkRole");

router.get("/", auth, categoryCtrl.getAll);
router.post("/", auth, checkRole("admin"), categoryCtrl.create);
router.put("/:id", auth, checkRole("admin"), categoryCtrl.update);
router.delete("/:id", auth, checkRole("admin"), categoryCtrl.remove);

module.exports = router;