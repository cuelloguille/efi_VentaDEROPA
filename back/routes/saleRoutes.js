const express = require("express");
const router = express.Router();
const salesCtrl = require("../controllers/salesController");
const auth = require("../midlewares/auth");

router.post("/", auth, salesCtrl.createSale);
router.get("/", auth, salesCtrl.getSales);
router.get("/details/:id_venta", auth, salesCtrl.getSaleDetails);

module.exports = router;
